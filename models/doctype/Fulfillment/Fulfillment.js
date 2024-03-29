const model = require('dataentjs/model');
const Quotation = require('../Quotation/Quotation');

module.exports = model.extend(Quotation, {
    name: "Fulfillment",
    label: "Fulfillment",
    settings: "FulfillmentSettings",
    fields: [
        {
            "fieldname": "items",
            "childtype": "FulfillmentItem"
        }
    ]
});
