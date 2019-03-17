// vue imports
import Vue from 'vue';
import App from './App';
import router from './router';
import dataentVue from 'dataentjs/ui/plugins/dataentVue';

// dataentjs imports
import dataent from 'dataentjs';
import dataentConf from '../dataent.conf';
import io from 'socket.io-client';
import HTTPClient from 'dataentjs/backends/http';
import common from 'dataentjs/common';
import coreModels from 'dataentjs/models';
import models from '../models';
import registerReportMethods from '../reports';

dataent.init();
dataent.registerLibs(common);
dataent.registerModels(coreModels);
dataent.registerModels(models);
const server = `localhost:${dataentConf.dev.devServerPort}`;
dataent.fetch = window.fetch.bind();
dataent.db = new HTTPClient({ server });
const socket = io.connect(`http://${server}`);
dataent.db.bindSocketClient(socket);
dataent.getSingle('SystemSettings');
registerReportMethods();

dataent.getSingle('AccountingSettings')
  .then(accountingSettings => {
    if (router.currentRoute.fullPath !== '/') return;

    if (accountingSettings.companyName) {
      dataent.events.trigger('show-desk');
    } else {
      dataent.events.trigger('show-setup-wizard');
    }
  });

dataent.events.on('SetupWizard:setup-complete', async ({ setupWizardValues }) => {
  const {
    companyName,
    country,
    name,
    email,
    abbreviation,
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
  await dataent.call({ method: 'import-coa' });

  dataent.events.trigger('show-desk');
});

window.dataent = dataent;

Vue.config.productionTip = false;
Vue.use(dataentVue);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
