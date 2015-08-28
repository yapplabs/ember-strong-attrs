import Ember from 'ember';
import { optionalAttr } from 'ember-strong-attrs';
import { module, test } from 'qunit';

module('optionalAttrs test', {
});

test('does not throw when missing optional attrs', (assert) => {
  @optionalAttr('someString', String)
  class KlassOptionalString extends Ember.Component.extend({}) { }
  const noStringOject = KlassOptionalString.create({
    attrs: {}
  });

  assert.ok(noStringOject,
    'does not throw error message when missing optional string attr');

  @optionalAttr('someDate', Date)
  class KlassOptionalDate extends Ember.Component.extend({}) { }
  const noDateObject = KlassOptionalDate.create({
    attrs: {}
  });

  assert.ok(noDateObject,
    'does not throw error message when missing optional date attr');

  @optionalAttr('someNumber', Number)
  class KlassOptionalNumber extends Ember.Component.extend({}) { }
  const noNumberObject = KlassOptionalNumber.create({
    attrs: {}
  });

  assert.ok(noNumberObject,
    'does not throw error message when missing optional Number attr');
});

test('throws when provided attr type does not match specified type', (assert) => {
  @optionalAttr('someString', String)
  class KlassOptionalString extends Ember.Component.extend({}) { }
  const noStringErrorBlock = () => {
    KlassOptionalString.create({
      attrs: {
        someString: 1
      }
    });
  };

  assert.throws(noStringErrorBlock, (error) => {
    return Ember.isPresent(error.message.match(/someString/));
  }, 'throws error message when attr is not String');

  @optionalAttr('someDate', Date)
  class KlassOptionalDate extends Ember.Component.extend({}) { }
  const noDateErrorBlock = () => {
    KlassOptionalDate.create({
      attrs: {
        someDate: ''
      }
    });
  };

  assert.throws(noDateErrorBlock, (error) => {
    return Ember.isPresent(error.message.match(/someDate/));
  }, 'throws error message when attr is not Date');

  @optionalAttr('someNumber', Number)
  class KlassOptionalNumber extends Ember.Component.extend({}) { }
  const noNumberErrorBlock = () => {
    KlassOptionalNumber.create({
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
  @optionalAttr('someString', String)
  class KlassOptionalString extends Ember.Component.extend({}) { }
  const objectWithStringAttr = KlassOptionalString.create({
    attrs: {
      someString: ''
    }
  });

  assert.ok(objectWithStringAttr, 'does not throw when optional attr is provided');

  @optionalAttr('someDate', Date)
  class KlassOptionalDate extends Ember.Component.extend({}) { }
  const objectWithDateAttr = KlassOptionalDate.create({
    attrs: {
      someDate: new Date()
    }
  });

  assert.ok(objectWithDateAttr, 'does not throw when optional attr is provided');

  @optionalAttr('someNumber', Number)
  class KlassOptionalNumber extends Ember.Component.extend({}) { }
  const objectWithNumberAttr = KlassOptionalNumber.create({
    attrs: {
      someNumber: 1
    }
  });

  assert.ok(objectWithNumberAttr, 'does not throw when optional attr is provided');
});
