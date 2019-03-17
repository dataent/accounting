const dataent = require('dataentjs');
module.exports = async function getData() {
    account = await dataent.getDoc('EmailAccount');
    return account;
}