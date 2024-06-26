import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  externalLinks: service(),

  tagName: 'li',
  classNames: ['rows', 'my-build'],
  classNameBindings: ['state'],

  state: alias('build.state'),

  branchUrl: computed('build.repo.{slug,vcsType}', 'build.branchName', function () {
    const [owner, repo] = (this.get('build.repo.slug') || '').split('/');
    const vcsType = this.get('build.repo.vcsType');
    const vcsId = this.get('build.repo.vcsId');
    const branch = this.get('build.branchName');
    const slugOwner = (this.get('build.repo.slug') || '').split('/')[0];
    const repoType = this.get('item.repo.serverType');
    const commit = this.get('commit.sha');

    return this.externalLinks.branchUrl(vcsType, repoType, { owner, repo, branch, vcsId, slugOwner, commit });
  }),

  commitUrl: computed('build.repo.{slug,vcsType}', 'build.commit.sha', function () {
    const [owner, repo] = (this.get('build.repo.slug') || '').split('/');
    const vcsType = this.get('build.repo.vcsType');
    const vcsId = this.get('build.repo.vcsId');
    const commit = this.get('build.commit.sha');
    const slugOwner = (this.get('build.repo.slug') || '').split('/')[0];

    return this.externalLinks.commitUrl(vcsType, { owner, repo, commit, vcsId, slugOwner });
  }),
});
