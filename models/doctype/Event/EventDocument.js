const dataent = require('dataentjs');
const BaseDocument = require('dataentjs/model/document');

module.exports = class Event extends BaseDocument {
    alertEvent() {
        alert(this.title);
    }
}
