import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | billing-summary-status', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.subscription = {
      isSubscribed: true,
      isExpired: false,
      isStripe: true,
      plan: {
        name: 'Bootstrap'
      }
    };
    this.isPending = false;
    this.setProperties({
      subscription: this.subscription,
      isPending: this.isPending
    });
  });

  test('it renders active status', async function (assert) {
    await render(hbs`<BillingSummaryStatus
      @subscription={{this.subscription}}
      @isPending={{this.isPending}}
    />`);

    assert.dom('[data-test-plan-name]').hasText('Bootstrap plan active');

    assert.dom('[data-test-active-status]').hasText('active');
  });

  test('it renders expired status', async function (assert) {
    this.set('subscription', {
      ...this.subscription,
      status: 'expired',
      isExpired: true,
      isSubscribed: false,
    });

    await render(hbs`<BillingSummaryStatus
      @subscription={{this.subscription}}
      @isPending={{this.isPending}}
    />`);

    assert.dom('[data-test-plan-name]').hasText('Bootstrap plan expired');
    assert.dom('[data-test-expired-status]').hasText('expired');
  });

  test('it renders incomplete status', async function (assert) {
    this.set('subscription', {
      ...this.subscription,
      status: 'incomplete',
      isIncomplete: true,
      isSubscribed: false,
    });

    await render(hbs`<BillingSummaryStatus
      @subscription={{this.subscription}}
      @isPending={{this.isPending}}
    />`);

    assert.dom('[data-test-plan-name]').hasText('Bootstrap plan incomplete');
    // assert.dom(profilePage.billing.billingSubscription.greyStatus).hasText('incomplete');
  });

  test('it renders pending status', async function (assert) {
    this.set('subscription', {
      ...this.subscription,
      status: 'pending',
      isPending: true,
      isSubscribed: false,
    });

    await render(hbs`<BillingSummaryStatus
      @subscription={{this.subscription}}
      @isPending={{this.isPending}}
    />`);

    assert.dom('[data-test-plan-name]').hasText('Bootstrap plan pending');
    //   assert.dom(profilePage.billing.billingSubscription.greyStatus).hasText('pending');
  });

  test('it renders canceled status', async function (assert) {
    this.set('subscription', {
      ...this.subscription,
      status: 'canceled',
      isCanceled: true,
      isExpired: false,
      isPending: false,
      isSubscribed: false,
    });

    await render(hbs`<BillingSummaryStatus
      @subscription={{this.subscription}}
    />`);

    assert.dom('[data-test-plan-name]').hasText('Bootstrap plan canceled');
    assert.dom('[data-test-grey-status]').hasText('canceled');
  });
});
