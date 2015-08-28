import Ember from 'ember';
import { requiredAttr } from 'ember-strong-attrs';
import { module, test } from 'qunit';

module('requiredAttrs test', {
});

test('throws when missing required attrs', (assert) => {
  @requiredAttr('someString', String)
  class KlassRequiringString extends Ember.Component.extend({}) { }
  const noStringErrorBlock = () => {
    KlassRequiringString.create({
      attrs: {}
    });
  };

  assert.throws(noStringErrorBlock, (error) => {
    return Ember.isPresent(error.message.match(/someString/));
  }, 'throws error message when missing required string attr');

  @requiredAttr('someDate', Date)
  class KlassRequiringDate extends Ember.Component.extend({}) { }
  const noDateErrorBlock = () => {
    KlassRequiringDate.create({
      attrs: {}
    });
  };

  assert.throws(noDateErrorBlock, (error) => {
    return Ember.isPresent(error.message.match(/someDate/));
  }, 'throws error message when missing required date attr');

  @requiredAttr('someNumber', Number)
  class KlassRequiringNumber extends Ember.Component.extend({}) { }
  const noNumberErrorBlock = () => {
    KlassRequiringNumber.create({
      attrs: {}
    });
  };

  assert.throws(noNumberErrorBlock, (error) => {
    return Ember.isPresent(error.message.match(/someNumber/));
  }, 'throws error message when missing required Number attr');
});

test('throws when provided attr type does not match required type', (assert) => {
  @requiredAttr('someString', String)
  class KlassRequiringString extends Ember.Component.extend({}) { }
  const noStringErrorBlock = () => {
    KlassRequiringString.create({
      attrs: {
        someString: 1
      }
    });
  };

  assert.throws(noStringErrorBlock, (error) => {
    return Ember.isPresent(error.message.match(/someString/));
  }, 'throws error message when attr is not String');

  @requiredAttr('someDate', Date)
  class KlassRequiringDate extends Ember.Component.extend({}) { }
  const noDateErrorBlock = () => {
    KlassRequiringDate.create({
      attrs: {
        someDate: ''
      }
    });
  };

  assert.throws(noDateErrorBlock, (error) => {
    return Ember.isPresent(error.message.match(/someDate/));
  }, 'throws error message when attr is not Date');

  @requiredAttr('someNumber', Number)
  class KlassRequiringNumber extends Ember.Component.extend({}) { }
  const noNumberErrorBlock = () => {
    KlassRequiringNumber.create({
      attrs: {
        someNumber: new Date()
      }
    });
  };

  assert.throws(noNumberErrorBlock, (error) => {
    return Ember.isPresent(error.message.match(/someNumber/));
  }, 'throws error message when attr is not Number');
});

test('does not throw when required attrs are provided', (assert) => {
  @requiredAttr('someString', String)
  class KlassRequiringString extends Ember.Component.extend({}) { }
  const objectWithStringAttr = KlassRequiringString.create({
    attrs: {
      someString: ''
    }
  });

  assert.ok(objectWithStringAttr, 'does not throw when requires attr is provided');

  @requiredAttr('someDate', Date)
  class KlassRequiringDate extends Ember.Component.extend({}) { }
  const objectWithDateAttr = KlassRequiringDate.create({
    attrs: {
      someDate: new Date()
    }
  });

  assert.ok(objectWithDateAttr, 'does not throw when requires attr is provided');

  @requiredAttr('someNumber', Number)
  class KlassRequiringNumber extends Ember.Component.extend({}) { }
  const objectWithNumberAttr = KlassRequiringNumber.create({
    attrs: {
      someNumber: 1
    }
  });

  assert.ok(objectWithNumberAttr, 'does not throw when requires attr is provided');
});
