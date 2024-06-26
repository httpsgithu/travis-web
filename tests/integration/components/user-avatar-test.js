import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | user avatar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders correctly', async function (assert) {
    this.set('name', 'Hello Test');
    this.set('url', '/images/tiny.gif');
    this.set('size', 38);

    await render(hbs`{{user-avatar name=this.name url=this.url size=this.size}}`);

    assert.dom('.pseudo-avatar').hasAttribute('data-initials', 'HT', 'initials should be correct');
    assert.dom('.real-avatar').hasAttribute('src', '/images/tiny.gif?v=3&s=38', 'avatar should display fallback image');
    assert.dom('.real-avatar').hasAttribute('srcset', '/images/tiny.gif?v=3&s=38 1x, /images/tiny.gif?v=3&s=76 2x', 'should provide a low and high res avatar');
  });
});
