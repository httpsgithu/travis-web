import Application from '@ember/application';

import { initialize } from 'travis/instance-initializers/pro-environment';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';

import EmberObject from '@ember/object';

import Resolver from 'travis/resolver';
import Evented from '@ember/object/evented';

module('Unit | Instance Initializer | pro environment', function (hooks) {
  hooks.beforeEach(function () {
    this.TestApplication = Application.extend(Evented, {Resolver, modulePrefix: 'pfx'});
    this.TestApplication.instanceInitializer({
      name: 'initializer under test',
      initialize
    });
    this.application = this.TestApplication.create({ autoboot: false });
    this.application.register('config:environment', EmberObject.create({ featureFlags: { 'pro-version': true }}));
    this.instance = this.application.buildInstance();
  });

  hooks.afterEach(function () {
    run(this.application, 'destroy');
    run(this.instance, 'destroy');
  });

  test('it sets flags appropriately', async function (assert) {
    await this.instance.boot();

    const { featureFlags } = this.instance.resolveRegistration('config:environment');

    assert.equal(featureFlags['repository-filtering'], true);
    assert.equal(featureFlags['debug-logging'], false);
    assert.equal(featureFlags['landing-page-cta'], false);
    assert.equal(featureFlags['show-running-jobs-in-sidebar'], true);
    assert.equal(featureFlags['debug-builds'], true);
    assert.equal(featureFlags['broadcasts'], true);
    assert.equal(featureFlags['beta-features'], true);
  });
});
