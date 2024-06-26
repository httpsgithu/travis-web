import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  createdAt: attr('date'),
  url: attr('string'),

  subscription: belongsTo('subscription', { async: false, inverse: 'invoices' })
});
