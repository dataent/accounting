const model = require('dataentjs/model');
const InvoiceItem = require('../InvoiceItem/InvoiceItem');

module.exports = model.extend(InvoiceItem, {
    name: "QuotationItem"
});
