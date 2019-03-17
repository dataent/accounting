import dataent from 'dataentjs';
import { _ } from 'dataentjs/utils';

export default {
  async getTitle() {
    const accountingSettings = await dataent.getSingle('AccountingSettings');
    return accountingSettings.companyName;
  },
  groups: [
    {
      title: _('Masters'),
      items: [
        {
          label: _('Item'), route: '#/list/Item'
        },
        {
          label: _('Party'), route: '#/list/Party'
        },
        {
          label: _('Tax'), route: '#/list/Tax'
        },
        {
          label: _('Account'), route: '#/tree/Account'
        }
      ]
    },
    {
      title: _('Transactions'),
      items: [
        {
          label: _('Invoice'), route: '#/list/Invoice'
        },
        {
          label: _('Journal Entry'), route: '#/list/JournalEntry'
        }
        // {
        //   label: _('Payment'), route: '#/list/Payment'
        // },
        // {
        //   label: _('AccountingLedgerEntry'), route: '#/list/AccountingLedgerEntry'
        // },
      ]
    },
    {
      title: _('Reports'),
      items: [
        {
          label: _('General Ledger'), route: '#/report/general-ledger'
        },
        {
          label: _('Sales Register'), route: '#/report/sales-register'
        },
        {
          label: _('Bank Reconciliation'), route: '#/report/bank-reconciliation'
        },
        {
          label: _('Goods and Service Tax'), route: '#/report/gst-taxes'
        }
      ]
    },
    {
      title: _('Tools'),
      items: [
        {
          label: _('Data Import'), route: '#/data-import'
        }
      ]
    }
  ]
};
