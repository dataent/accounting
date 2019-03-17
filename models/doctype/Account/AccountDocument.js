const dataent = require('dataentjs');
const BaseDocument = require('dataentjs/model/document');

module.exports = class Account extends BaseDocument {
    async validate() {
        if (!this.accountType) {
            if (this.parentAccount) {
                this.accountType = await dataent.db.getValue('Account', this.parentAccount, 'accountType');
            } else {
                this.accountType = 'Asset';
            }
        }
    }
}