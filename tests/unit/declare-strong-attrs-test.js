import Ember from 'ember';
import { declareStrongAttrs } from 'ember-strong-attrs';
import { module, test } from 'qunit';

module('declareStrongAttrs test', {
});

test('does not throw when missing optional attrs', (assert) => {
  const KlassOptionalString = declareStrongAttrs(function() {
    this.optionalAttr('someString', String);
  }, Ember.Component.extend({}));
  const noStringOject = KlassOptionalString.create({
    attrs: {}
  });

  assert.ok(noStringOject,
    'does not throw error message when missing optional string attr');

  const KlassOptionalNumber = declareStrongAttrs(function() {
    this.optionalAttr('someNumber', Number);
  }, Ember.Component.extend({}));
  const noNumberOject = KlassOptionalNumber.create({
    attrs: {}
  });

  assert.ok(noNumberOject,
    'does not throw error message when missing optional Number attr');
});

test('throws when missing required attrs', (assert) => {
  const KlassRequireString = declareStrongAttrs(function() {
    this.requiredAttr('someString', String);
  }, Ember.Component.extend({}));
  const noStringErrorBlock = () => {
    KlassRequireString.create({
      attrs: {}
    });
  };

  assert.throws(noStringErrorBlock, (error) => {
    return Ember.isPresent(error.message.match(/someString/));
  }, 'throws error message when missing required string attr');

  const KlassRequireNumber = declareStrongAttrs(function() {
    this.requiredAttr('someNumber', Number);
  }, Ember.Component.extend({}));
  const noNumberErrorBlock = () => {
    KlassRequireNumber.create({
      attrs: {}
    });
  };

  assert.throws(noNumberErrorBlock, (error) => {
    return Ember.isPresent(error.message.match(/someNumber/));
  }, 'throws error message when missing required Number attr');
});
