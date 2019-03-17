const model = require('dataentjs/model');
const BillItem = require('../BillItem/BillItem');

module.exports = model.extend(BillItem, {
    name: "PurchaseOrderItem"
});
