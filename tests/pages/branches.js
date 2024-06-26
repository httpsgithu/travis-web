import {
  attribute,
  create,
  collection,
  hasClass,
  notHasClass,
  text,
  visitable
} from 'ember-cli-page-object';

const branchRowComponent = {
  scope: '.default-branch .branch-row',

  name: text('.row-name .label-align'),
  buildCount: text('.row-builds .label-align'),

  passed: hasClass('passed'),
  failed: hasClass('failed'),
  errored: hasClass('errored'),
  created: hasClass('created'),

  request: text('.row-request .label-align'),
  commitSha: text('.row-commit span.inner-underline'),
  committer: text('.row-commiter .label-align'),

  commitDate: {
    scope: '.row-calendar',
    text: text('.label-align'),
    title: attribute('title', '.row-item'),
  },

  buildTiles: collection('.build-tiles li', {
    passed: hasClass('passed'),
    failed: hasClass('failed'),
    errored: hasClass('errored'),
    empty: notHasClass('passed') && notHasClass('failed') && notHasClass('errored'),
    number: text('.build-tile-number')
  })
};

export default create({
  visit: visitable(':organization/:repo/branches'),

  branchesTabActive: hasClass('active', '#tab_branches'),

  showsNoBranchesMessaging: text('.missing-notice h2.page-title'),

  defaultBranch: branchRowComponent,

  activeBranches: collection('.active-branches .branch-row', branchRowComponent),
  inactiveBranches: collection('.inactive-branches .branch-row', branchRowComponent),
});
