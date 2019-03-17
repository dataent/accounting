const dataent = require('dataentjs');

class GoodsAndServiceTax {
  async run(params) {
    let filters = {};
    if (params.toDate || params.fromDate) {
      filters.date = [];
      if (params.toDate) filters.date.push('<=', params.toDate);
      if (params.fromDate) filters.date.push('>=', params.fromDate);
    }
    if (params.transferType) filters.transferType = params.transferType;

    let invoiceNames = await dataent.db.getAll({
      doctype: 'Invoice',
      filter: filters
    });

    let tableData = [];
    for (let invoice of invoiceNames) {
      const row = await this.getRow(invoice.name)
      tableData.push(row)
    }  

    if(Object.keys(filters).length != 0){
      tableData = tableData.filter((row) => {
        if(filters.account) return row.account === filters.account
        if(filters.transferType) return row.transferType === filters.transferType
        if(filters.place) return row.place === filters.place
        return true
      })
    }

    return tableData;
  }

  async getRow(name) {
    let row = {}
    let invoiceDetails = await dataent.getDoc('Invoice', name);
    let customerDetails = await dataent.getDoc('Party', invoiceDetails.customer);
    let addressDetails = await dataent.getDoc('Address', customerDetails.address);
    row.gstin = customerDetails.gstin
    row.cusName = invoiceDetails.customer
    row.invNo = invoiceDetails.name
    row.invDate = invoiceDetails.date
    row.place = addressDetails.state
    row.rate = 0
    row.transferType = 'In State';
    invoiceDetails.taxes.forEach(tax => {
      row.rate += tax.rate
      if (tax.account === 'IGST') row.transferType = 'Out of State';
    });
    row.invAmt = invoiceDetails.grandTotal
    row.taxAmt = invoiceDetails.netTotal
    return row
  }
  
}

module.exports = GoodsAndServiceTax;
