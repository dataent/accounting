const dataent = require('dataentjs');
const registerReportMethods = require('../reports');
const sender = require('../email/sender');

module.exports = function registerServerMethods() {
  registerReportMethods();

  dataent.registerMethod({
    method: 'send-mail',
    handler: sender.sendMail
  });
  
  dataent.registerMethod({
    method: 'import-coa',
    async handler() {
      const importCOA = require('../models/doctype/Account/importCOA');
      await importCOA();
    }
  });

  dataent.registerMethod({
    method: 'print-pdf',
    handler({doctype, name, html}) {
      if (dataent.isElectron) {
        const path = require('path');
        const { getPDFForElectron } = require('dataentjs/server/pdf');
        const { getSettings } = require('../electron/settings');
        const destination = path.resolve('.')
        getPDFForElectron(doctype, name, destination, html);
      }
    }
  })
}