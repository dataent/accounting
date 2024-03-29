import { _ } from 'dataentjs/utils';
import indicators from 'dataentjs/ui/constants/indicators';

export default {
  doctype: 'Payment',
  title: _('Payment'),
  columns: [
    'party',
    {
      label: 'Payment',
      getValue(doc) {
        if (doc.submitted === 1 && doc.clearanceDate !== null) {
          return 'Reconciled';
        }
        return 'Not Reconciled';
      },
      getIndicator(doc) {
        if (doc.submitted === 1 && doc.clearanceDate !== null) {
          return indicators.GREEN;
        }
        return indicators.ORANGE;
      }
    },
    'account',
    'amount',
    'date',
    'clearanceDate',
    'name'
  ]
}