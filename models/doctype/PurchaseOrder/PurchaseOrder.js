const model = require('dataentjs/model');
const Bill = require('../Bill/Bill');

module.exports = model.extend(Bill, {
    name: "PurchaseOrder",
    label: "Purchase Order",
    settings: "PurchaseOrderSettings",
    fields: [
        {
            "fieldname": "items",
            "childtype": "PurchaseOrderItem"
        }
    ]
}, {
    skipFields: ['account']
});
