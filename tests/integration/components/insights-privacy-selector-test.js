import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { INSIGHTS_PRIVACY_OPTIONS } from 'travis/components/insights-privacy-selector';
import { selectChoose } from 'ember-power-select/test-support';

module('Integration | Component | insights-privacy-selector', function (hooks) {
  setupRenderingTest(hooks);

  test('default', async function (assert) {
    await render(hbs`{{insights-privacy-selector}}`);
    assert.dom('.insights-privacy-selector__selected').hasText(INSIGHTS_PRIVACY_OPTIONS.PUBLIC);
  });

  test('only public available', async function (assert) {
    this.setProperties({
      isPrivateViewable: false,
      includePrivate: false,
    });

    await render(hbs`{{insights-privacy-selector isPrivateViewable=this.isPrivateViewable includePrivate=this.includePrivate}}`);
    assert.dom('.insights-privacy-selector__selected').hasText(INSIGHTS_PRIVACY_OPTIONS.PUBLIC);

    this.set('includePrivate', true);
    await render(hbs`{{insights-privacy-selector isPrivateViewable=this.isPrivateViewable includePrivate=this.includePrivate}}`);
    assert.dom('.insights-privacy-selector__selected').hasText(INSIGHTS_PRIVACY_OPTIONS.PUBLIC);
  });

  skip('private available, public selected', async function (assert) {
    this.setProperties({
      isPrivateViewable: true,
      includePrivate: false,
      setPrivate: (actual) => {
        assert.equal(actual, !this.includePrivate);
      }
    });

    await render(hbs`{{insights-privacy-selector
      isPrivateViewable=this.isPrivateViewable
      includePrivate=this.includePrivate
      setRequestPrivateInsights=this.setPrivate
    }}`);

    assert.dom('.ember-power-select-selected-item').hasText(INSIGHTS_PRIVACY_OPTIONS.PUBLIC);

    selectChoose('.travis-form__field-select', INSIGHTS_PRIVACY_OPTIONS.PRIVATE);
  });

  skip('private available, private selected', async function (assert) {
    this.setProperties({
      isPrivateViewable: true,
      includePrivate: true,
      setPrivate: (actual) => {
        assert.equal(actual, !this.includePrivate);
      }
    });

    await render(hbs`{{insights-privacy-selector
      isPrivateViewable=this.isPrivateViewable
      includePrivate=this.includePrivate
      setRequestPrivateInsights=this.setPrivate
    }}`);

    assert.dom('.ember-power-select-selected-item').hasText(INSIGHTS_PRIVACY_OPTIONS.PRIVATE);

    selectChoose('.travis-form__field-select', INSIGHTS_PRIVACY_OPTIONS.PUBLIC);
  });
});
