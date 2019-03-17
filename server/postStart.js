const dataent = require('dataentjs');
const naming = require('dataentjs/model/naming');
const registerServerMethods = require('./registerServerMethods');

module.exports = async function postStart() {
  // set server-side modules
  dataent.models.Invoice.documentClass = require('../models/doctype/Invoice/InvoiceServer.js');
  dataent.models.Payment.documentClass = require('../models/doctype/Payment/PaymentServer.js');
  dataent.models.Bill.documentClass = require('../models/doctype/Bill/BillServer.js');
  dataent.models.JournalEntry.documentClass = require('../models/doctype/JournalEntry/JournalEntryServer.js');

  dataent.metaCache = {};

  dataent.syncDoc(require('../fixtures/invoicePrint'));

  // init naming series if missing
  await naming.createNumberSeries('INV-', 'InvoiceSettings');
  await naming.createNumberSeries('BILL-', 'BillSettings');
  await naming.createNumberSeries('PAY-', 'PaymentSettings');
  await naming.createNumberSeries('JV-', 'JournalEntrySettings');
  await naming.createNumberSeries('QTN-', 'QuotationSettings');
  await naming.createNumberSeries('SO-', 'SalesOrderSettings');
  await naming.createNumberSeries('OF-', 'FulfillmentSettings');
  await naming.createNumberSeries('PO-', 'PurchaseOrderSettings');
  await naming.createNumberSeries('PREC-', 'PurchaseReceiptSettings');

  registerServerMethods();
}