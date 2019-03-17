const model = require('dataentjs/model');
const QuotationItem = require('../QuotationItem/QuotationItem');

module.exports = model.extend(QuotationItem, {
    name: "FulfillmentItem"
});
