const os = require('os');
const path = require('path');
const fs = require('fs');
const { writeFile } = require('dataentjs/server/utils');

const homedir = os.homedir();
const configFilePath = path.join(homedir, '.config', 'dataent-accounting', 'settings.json');

function getSettings() {
  let settings;
  try {
    settings = JSON.parse(fs.readFileSync(configFilePath) || '{}');
  } catch (e) {
    settings = {};
  }

  return settings;
}

async function saveSettings(settings) {
  await writeFile(configFilePath, JSON.stringify(settings));
}
console.log(getSettings());

module.exports = {
  getSettings,
  saveSettings
};
