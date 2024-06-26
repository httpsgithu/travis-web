import { currentURL } from '@ember/test-helpers';
// import Ember from 'ember';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'travis/tests/helpers/setup-application-test';
import nonExistentRepoPage from 'travis/tests/pages/repo/non-existent';
import { enableFeature } from 'ember-feature-flags/test-support';
import signInUser from 'travis/tests/helpers/sign-in-user';
import { setupMirage } from 'ember-cli-mirage/test-support';

// let adapterException;
// let loggerError;

module('Acceptance | repo/not found', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);


  test('visiting /non-existent/repository shows error message when authenticated', async function (assert) {
    const user = this.server.create('user');
    signInUser(user);

    await nonExistentRepoPage.visit();

    assert.equal(currentURL(), '/non-existent/repository');
    assert.ok(nonExistentRepoPage.showsBarricadeIllustration, 'Shows image for aesthetics');
    assert.equal(nonExistentRepoPage.errorMessage, 'We couldn\'t display the repository non-existent/repository', 'Shows message that repository was not found');
    assert.ok(nonExistentRepoPage.errorMessageProisHidden, 'does not show .com authenticated message');
  });

  test('visiting /non-existent/repository shows error message when unauthenticated', async function (assert) {
    enableFeature('proVersion');
    await nonExistentRepoPage.visit();

    assert.equal(currentURL(), '/non-existent/repository');
    assert.ok(nonExistentRepoPage.showsBarricadeIllustration, 'Shows image for aesthetics');
    assert.equal(nonExistentRepoPage.errorMessage, 'We couldn\'t display the repository non-existent/repository', 'Shows message that repository was not found');
    assert.ok(nonExistentRepoPage.errorMessageProUnauthenticated, 'shows .com authenticated message');
  });
});
