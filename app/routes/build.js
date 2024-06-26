import TravisRoute from 'travis/routes/basic';
import { inject as service } from '@ember/service';

export default TravisRoute.extend({
  tabStates: service(),
  store: service(),

  titleToken(model) {
    return `Build #${model.get('number')}`;
  },

  serialize(model) {
    const id = model.get ? model.get('id') : model;
    return {
      build_id: id
    };
  },

  setupController(controller, model) {
    if (model && !model.get) {
      model = this.store.peekRecord('build', model);
      this.store.find('build', model);
    }
    const repo = this.controllerFor('repo');
    controller.set('build', model);
    return repo.activate('build');
  },

  activate() {
    this.set('tabStates.mainTab', 'build');
  },

  model(params) {
    //   let res =  this.store.findRecord('build', params.build_id);
    let res = this.store.find('build', params.build_id);
    return res;
  },

  afterModel(model) {
    const slug = this.modelFor('repo').get('slug');
    this.ensureBuildOwnership(model, slug);
    let request = model.request;
    try {
      if (request) request.fetchMessages.perform();
    } catch (e) {
    }
  },

  beforeModel() {
    const repo = this.modelFor('repo');
    if (repo && !repo.repoOwnerAllowance) {
      repo.fetchRepoOwnerAllowance.perform();
    }
  },

  ensureBuildOwnership(build, urlSlug) {
    const buildRepoSlug = build.get('repo.slug');
    if (buildRepoSlug !== urlSlug) {
      throw (new Error('invalidBuildId'));
    }
    return;
    /*
    build.repo.then(e => {
      const buildRepoSlug = build.get('repo.slug');
      if (buildRepoSlug !== urlSlug) {
        throw (new Error('invalidBuildId'));
      }
    }); */
  },

  deactivate() {
    this._super(...arguments);
    this.controllerFor('job').set('job', null);
    return this.controllerFor('build').set('build', null);
  }
});
