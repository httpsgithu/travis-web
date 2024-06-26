import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | format-domain', function (hooks) {
  setupRenderingTest(hooks);

  test('it works', async function (assert) {
    this.set('inputValue', 'https://education.travis-ci.com/');

    await render(hbs`{{format-domain this.inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'education.travis-ci.com');
  });
});
