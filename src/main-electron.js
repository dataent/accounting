// dataentjs imports
import dataent from 'dataentjs';
import path from 'path';
import SQLite from 'dataentjs/backends/sqlite';
import common from 'dataentjs/common';
import coreModels from 'dataentjs/models';
import models from '../models';
import postStart from '../server/postStart';
import {
  getSettings,
  saveSettings
} from '../electron/settings';

// vue imports
import Vue from 'vue';
import App from './App';
import router from './router';
import dataentVue from 'dataentjs/ui/plugins/dataentVue';
import Toasted from 'vue-toasted';

(async () => {
  dataent.isServer = true;
  dataent.isElectron = true;
  dataent.init();
  dataent.registerLibs(common);
  dataent.registerModels(coreModels);
  dataent.registerModels(models);
  dataent.fetch = window.fetch.bind();
  dataent.events.on('connect-database', async (filepath) => {
    await connectToLocalDatabase(filepath);

    const accountingSettings = await dataent.getSingle('AccountingSettings');
    const country = accountingSettings.country;

    if (country === "India") {
      dataent.models.Party = require('../models/doctype/Party/RegionalChanges.js')
    } else {
      dataent.models.Party = require('../models/doctype/Party/Party.js')
    }
    dataent.events.trigger('show-desk');

  });

  dataent.events.on('DatabaseSelector:file-selected', async (filepath) => {
    await connectToLocalDatabase(filepath);

    localStorage.dbPath = filepath;

    const accountingSettings = await dataent.getSingle('AccountingSettings');
    if (!accountingSettings.companyName) {
      dataent.events.trigger('show-setup-wizard');
    } else {
      dataent.events.trigger('show-desk');
    }
  });

  dataent.events.on('SetupWizard:setup-complete', async (setupWizardValues) => {
    const {
      companyName,
      country,
      name,
      email,
      bankName,
      fiscalYearStart,
      fiscalYearEnd
    } = setupWizardValues;

    const doc = await dataent.getSingle('AccountingSettings');
    await doc.set({
      companyName,
      country,
      fullname: name,
      email,
      bankName,
      fiscalYearStart,
      fiscalYearEnd
    });

    await doc.update();
    await dataent.call({
      method: 'import-coa'
    });

    if (country === "India") {
      dataent.models.Party = require('../models/doctype/Party/RegionalChanges.js')
      await dataent.db.migrate()
      await generateGstTaxes();
    }
    dataent.events.trigger('show-desk');
  });
  async function generateGstTaxes() {
    const gstPercents = [5, 12, 18, 28];
    const gstTypes = ['Out of State', 'In State'];
    let newTax = await dataent.getNewDoc('Tax');
    for (const type of gstTypes) {
      for (const percent of gstPercents) {
        switch (type) {
          case 'Out of State':
            await newTax.set({
              name: `${type}-${percent}`,
              details: [{
                account: "IGST",
                rate: percent
              }]
            })
            break;
          case 'In State':
            await newTax.set({
              name: `${type}-${percent}`,
              details: [{
                  account: "CGST",
                  rate: percent / 2
                },
                {
                  account: "SGST",
                  rate: percent / 2
                }
              ]
            })
            break;
        }
        await newTax.insert();
      }
    }
    await newTax.set({
      name: `Exempt-0`,
      details: [{
        account: "Exempt",
        rate: 0
      }]
    })
    await newTax.insert();
  }

  async function connectToLocalDatabase(filepath) {
    try {
      dataent.login('Administrator');
      dataent.db = new SQLite({
        dbPath: filepath
      });
      await dataent.db.connect();
      await dataent.db.migrate();
      dataent.getSingle('SystemSettings');
      await postStart();
    } catch (e) {
      console.log(e);
    }
  }


  window.dataent = dataent;

  Vue.config.productionTip = false;
  Vue.use(dataentVue);
  Vue.use(Toasted, {
    position: 'bottom-right',
    duration: 3000
  });

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    components: {
      App
    },
    template: '<App/>'
  });
})()