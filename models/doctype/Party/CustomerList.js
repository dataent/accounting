import { _ } from 'dataentjs/utils';

export default {
  doctype: 'Party',
  title: _('Customer'),
  columns: [
    'name'
  ],
  filters: {
    customer: 1
  }
}