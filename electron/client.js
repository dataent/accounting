const dataent = require('dataentjs');
const path = require('path');
const electron = require('dataentjs/client/electron');
const appClient = require('../client');
const SetupWizard = require('../setup');
const { getPDFForElectron } = require('dataentjs/server/pdf');
const { getSettings, saveSettings } = require('./settings');
const { postStart } = require('../server');
const { slug } = require('dataentjs/utils');

const fs = require('fs');

require.extensions['.html'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

(async () => {
  let electronSettings = getSettings();
  let firstRun = false;
  let setupWizardValues = null;

  if (!electronSettings.dbPath) {
    const values = await runSetupWizard();
    const dbPath = path.join(values.file[0].path, slug(values.companyName) + '.db');
    const config = {
      directory: path.dirname(dbPath),
      dbPath: dbPath
    };
    await saveSettings(config);

    firstRun = true;
    electronSettings = config;
    setupWizardValues = values;
  }

  await electron.start({
    dbPath: electronSettings.dbPath,
    models: require('../models')
  });

  await postStart();

  if (firstRun) {
    await saveSetupWizardValues(setupWizardValues);
    await bootstrapChartOfAccounts();
  }

  dataent.getPDF = getPDFForElectron;
  dataent.electronSettings = electronSettings;

  appClient.start();
})();

async function runSetupWizard() {
  const setup = new SetupWizard();
  const values = await setup.start();
  return values;
}

async function saveSetupWizardValues(values) {
  const {
    companyName,
    country,
    name,
    email,
    abbreviation,
    bankName,
    fiscalYearStart,
    fiscalYearEnd
  } = values;

  const doc = await dataent.getDoc('AccountingSettings');

  await doc.set('companyName', companyName);
  await doc.set('country', country);
  await doc.set('fullname', name);
  await doc.set('email', email);
  await doc.set('bankName', bankName);
  await doc.set('fiscalYearStart', fiscalYearStart);
  await doc.set('fiscalYearEnd', fiscalYearEnd);

  await doc.update();
}

async function bootstrapChartOfAccounts() {
  const importCOA = require('../models/doctype/account/importCOA');
  const chart = require('../fixtures/standardCOA');
  await importCOA(chart);
}
