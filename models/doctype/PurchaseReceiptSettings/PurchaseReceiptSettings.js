const model = require('dataentjs/model');
const PurchaseOrderSettings = require('../PurchaseOrderSettings/PurchaseOrderSettings');

module.exports = model.extend(PurchaseOrderSettings, {
    "name": "PurchaseReceiptSettings",
    "label": "Purchase Receipt Settings",
    "fields": [
        {
            "fieldname": "numberSeries",
            "default": "PREC"
        }
    ]
});
