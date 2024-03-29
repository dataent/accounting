const dataent = require('dataentjs');
const FinancialStatementsView = require('../FinancialStatements/FinancialStatementsView');

module.exports = class BalanceSheetView extends FinancialStatementsView {
    constructor() {
        super({
            title: dataent._('Balance Sheet'),
            method: 'balance-sheet',
            filterFields: [
                {fieldtype: 'Date', fieldname: 'toDate', label: 'To Date', required: 1},
                {fieldtype: 'Select', options: ['Monthly', 'Quarterly', 'Half Yearly', 'Yearly'],
                    label: 'Periodicity', fieldname: 'periodicity', default: 'Monthly'}
            ]
        });
    }

    async setDefaultFilterValues() {
        const accountingSettings = await dataent.getSingle('AccountingSettings');
        this.filters.setValue('toDate', accountingSettings.fiscalYearEnd);
        this.filters.setValue('periodicity', 'Monthly');

        this.run();
    }
}
