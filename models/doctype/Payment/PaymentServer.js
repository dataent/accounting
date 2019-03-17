const BaseDocument = require('dataentjs/model/document');
const dataent = require('dataentjs');
const LedgerPosting = require('../../../accounting/ledgerPosting');

module.exports = class PaymentServer extends BaseDocument {
    getPosting() {
        let entries = new LedgerPosting({reference: this, party: this.party});
        entries.debit(this.paymentAccount, this.amount);

        for (let row of this.for) {
            entries.credit(this.account, row.amount, row.referenceType, row.referenceName);
        }

        return entries;

    }

    async afterSubmit() {
        await this.getPosting().post();
        for (let row of this.for) {
          if (row.referenceType === 'Invoice') {
            await dataent.db.setValue('Invoice', row.referenceName, 'outstandingAmount', 0.0);
          }
        }
    }

    async afterRevert() {
        await this.getPosting().postReverse();
    }
}