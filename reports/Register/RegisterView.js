const ReportPage = require('dataentjs/client/desk/reportpage');
const dataent = require('dataentjs');
const { DateTime } = require('luxon');
const { unique } = require('dataentjs/utils');

module.exports = class RegisterView extends ReportPage {
    constructor({ title }) {
        super({
            title,
            filterFields: [
                {fieldtype: 'Date', fieldname: 'fromDate', label: 'From Date', required: 1},
                {fieldtype: 'Date', fieldname: 'toDate', label: 'To Date', required: 1}
            ]
        });

        this.datatableOptions = {
            layout: 'fixed'
        }
    }

    async setDefaultFilterValues() {
        const today = DateTime.local();
        const oneMonthAgo = today.minus({ months: 1 });

        this.filters.setValue('fromDate', oneMonthAgo.toISODate());
        this.filters.setValue('toDate', today.toISODate());

        this.run();
    }

    getRowsForDataTable(data) {
        return data.rows || [];
    }
}
