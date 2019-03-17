const ReportPage = require('dataentjs/client/desk/reportpage');
const dataent = require('dataentjs');

module.exports = class GeneralLedgerView extends ReportPage {
  constructor() {
    super({
      title: dataent._('General Ledger'),
      filterFields: [{
          fieldtype: 'Select',
          options: ['', 'Invoice', 'Payment'],
          label: 'Reference Type',
          fieldname: 'referenceType'
        },
        {
          fieldtype: 'DynamicLink',
          references: 'referenceType',
          label: 'Reference Name',
          fieldname: 'referenceName'
        },
        {
          fieldtype: 'Link',
          target: 'Account',
          label: 'Account'
        },
        {
          fieldtype: 'Link',
          target: 'Party',
          label: 'Party'
        },
        {
          fieldtype: 'Date',
          label: 'From Date'
        },
        {
          fieldtype: 'Date',
          label: 'To Date'
        }
      ]
    });

    this.method = 'general-ledger';
  }

  getColumns() {
    return [{
        label: 'Date',
        fieldtype: 'Date'
      },
      {
        label: 'Account',
        fieldtype: 'Link'
      },
      {
        label: 'Debit',
        fieldtype: 'Currency'
      },
      {
        label: 'Credit',
        fieldtype: 'Currency'
      },
      {
        label: 'Balance',
        fieldtype: 'Currency'
      },
      {
        label: 'Reference Type',
        fieldtype: 'Data'
      },
      {
        label: 'Reference Name',
        fieldtype: 'Data'
      },
      {
        label: 'Party',
        fieldtype: 'Link'
      },
      {
        label: 'Description',
        fieldtype: 'Data'
      }
    ];
  }
};
