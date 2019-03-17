const dataent = require('dataentjs');
const GeneralLedger = require('./GeneralLedger/GeneralLedger');
const ProfitAndLoss = require('./ProfitAndLoss/ProfitAndLoss');
const BalanceSheet = require('./BalanceSheet/BalanceSheet');
const TrialBalance = require('./TrialBalance/TrialBalance');
const SalesRegister = require('./SalesRegister/SalesRegister');
const PurchaseRegister = require('./PurchaseRegister/PurchaseRegister');
const BankReconciliation = require('./BankReconciliation/BankReconciliation');
const GoodsAndServiceTax = require('./GoodsAndServiceTax/GoodsAndServiceTax');
const AccountsReceivablePayable = require('./AccountsReceivablePayable/AccountsReceivablePayable');

// called on server side
function registerReportMethods() {
    const reports = [{
            method: 'general-ledger',
            class: GeneralLedger
        },
        {
            method: 'profit-and-loss',
            class: ProfitAndLoss
        },
        {
            method: 'balance-sheet',
            class: BalanceSheet
        },
        {
            method: 'trial-balance',
            class: TrialBalance
        },
        {
            method: 'sales-register',
            class: SalesRegister
        },
        {
            method: 'purchase-register',
            class: PurchaseRegister
        },
        {
            method: 'bank-reconciliation',
            class: BankReconciliation
        },
        {
            method: 'gst-taxes',
            class: GoodsAndServiceTax
        },
    ];

    reports.forEach(report => {
        dataent.registerMethod({
            method: report.method,
            handler: getReportData(report.class)
        });
    });

    dataent.registerMethod({
        method: 'accounts-receivable',
        handler: args => new AccountsReceivablePayable().run('Receivable', args)
    });

    dataent.registerMethod({
        method: 'accounts-payable',
        handler: args => new AccountsReceivablePayable().run('Payable', args)
    });
}

function getReportData(ReportClass) {
    return args => new ReportClass().run(args);
}

module.exports = registerReportMethods
