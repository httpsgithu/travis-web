import { currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'travis/tests/helpers/setup-application-test';
import { setupMirage } from 'ember-cli-mirage/test-support';
import defaultHeader from 'travis/tests/pages/header/default';
import footer from 'travis/tests/pages/footer';

module('Acceptance | layouts/logo page', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('logo page renders correct header/footer', async function (assert) {
    await visit('/logo');

    assert.equal(currentURL(), '/logo');

    assert.ok(defaultHeader.logoPresent, 'Default header has logo');
    assert.equal(defaultHeader.navigationLinks[1].title, 'Documentation', 'Shows link to Documentation');

    assert.ok(defaultHeader.loginLinkPresent, 'Default header has login button');

    assert.equal(footer.sections[1].title, 'Privacy');
  });
});
