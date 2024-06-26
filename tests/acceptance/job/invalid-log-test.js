import { visit } from '@ember/test-helpers';
// import Ember from 'ember';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'travis/tests/helpers/setup-application-test';
import jobPage from 'travis/tests/pages/job';
import { setupMirage } from 'ember-cli-mirage/test-support';

// let adapterException;
// let loggerError;

module('Acceptance | job/invalid log', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('viewing invalid job shows error', async function (assert) {
    // create incorrect repository as this is resolved first, errors otherwise
    this.server.create('user', {login: 'travis-ci'});
    this.server.create('allowance', {subscription_type: 1});
    this.server.create('repository', { slug: 'travis-ci/travis-api', owner: { login: 'travis-ci', id: 1 } });

    const repository = this.server.create('repository', { slug: 'travis-ci/travis-web', owner: { login: 'travis-ci', id: 1 } });
    const incorrectSlug = 'travis-ci/travis-api';
    const job = this.server.create('job', { repository });
    await visit(`${incorrectSlug}/jobs/${job.id}`);

    assert.equal(jobPage.jobNotFoundMessage, 'Oops, we couldn\'t find that job!', 'Shows missing job message');
  });
});
