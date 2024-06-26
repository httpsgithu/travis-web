import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | oss usage digit', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('digit', 1);
    await render(hbs`{{oss-usage-digit digit=this.digit}}`);

    assert.dom('img').hasAttribute('src', '../images/landing-page/oss-num-1.svg');
  });
});
