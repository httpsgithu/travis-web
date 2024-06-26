import Component from '@ember/component';
import { computed } from '@ember/object';
import { reads, and, empty } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';

export default Component.extend({
  account: null,
  subscription: null,
  trial: reads('account.trial'),
  isGithubTrial: and('subscription.isGithub', 'trial.hasActiveTrial'),
  hasGithubTrialEnded: and('subscription.isGithub', 'trial.isEnded'),
  noSubscription: empty('subscription'),
  isDefaultEducationView: computed('subscription', 'account.education', 'subscription.plan_name', function () {
    return this.subscription &&  !isEmpty(this.subscription) && this.get('account.education');
  }),
});
