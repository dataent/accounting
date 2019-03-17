const dataent = require('dataentjs');
const { unique } = require('dataentjs/utils');
const { getData } = require('../FinancialStatements/FinancialStatements');

class BalanceSheet {
    async run({ fromDate, toDate, periodicity }) {

        let asset = await getData({
            rootType: 'Asset',
            balanceMustBe: 'Debit',
            fromDate,
            toDate,
            periodicity,
            accumulateValues: true
        });

        let liability = await getData({
            rootType: 'Liability',
            balanceMustBe: 'Credit',
            fromDate,
            toDate,
            periodicity,
            accumulateValues: true
        });

        let equity = await getData({
            rootType: 'Equity',
            balanceMustBe: 'Credit',
            fromDate,
            toDate,
            periodicity,
            accumulateValues: true
        });

        const rows = [
            ...asset.accounts, asset.totalRow, [],
            ...liability.accounts, liability.totalRow, [],
            ...equity.accounts, equity.totalRow, []
        ];

        const columns = unique([
            ...asset.periodList,
            ...liability.periodList,
            ...equity.periodList
        ]);

        return { rows, columns };
    }
}

module.exports = BalanceSheet;
