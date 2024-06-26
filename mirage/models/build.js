import { Model, belongsTo, hasMany } from 'miragejs';

export default Model.extend({
  repository: belongsTo('repository'),
  createdBy: belongsTo('user'),
  commit: belongsTo('commit', { inverseOf: 'build' }),
  branch: belongsTo('branch'),
  jobs: hasMany('job'),
  stages: hasMany('stage'),
  request: belongsTo('request'),
});
