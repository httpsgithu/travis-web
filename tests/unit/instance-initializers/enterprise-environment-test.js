import Application from '@ember/application';
import Evented from '@ember/object/evented';

import { initialize } from 'travis/instance-initializers/enterprise-environment';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';

import Resolver from 'travis/resolver';

import EmberObject from '@ember/object';

module('Unit | Instance Initializer | enterprise environment', function (hooks) {
  hooks.beforeEach(function () {
    const TestApplication = Application.extend(Evented, {Resolver, modulePrefix: 'pfx'});
    TestApplication.instanceInitializer({
      name: 'initializer under test',
      initialize
    });

    this.application = TestApplication.create({ autoboot: false });

    this.application.register('config:environment', EmberObject.create({ featureFlags: { 'enterprise-version': true }}));
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
    assert.equal(featureFlags['debug-builds'], false);
    assert.equal(featureFlags['broadcasts'], false);
    assert.equal(featureFlags['beta-features'], false);
  });
});
