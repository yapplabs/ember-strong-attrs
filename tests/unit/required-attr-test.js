import Ember from 'ember';
import { requiredAttr } from 'ember-strong-attrs';
import { module, test } from 'qunit';

module('requiredAttrs test', {
});

test('throws when missing required attrs', (assert) => {
  /* jshint ignore: start */
  @requiredAttr('someString', String)
  /* jshint ignore: end */
  class KlassRequireString extends Ember.Component.extend({}) { }
  const noStringErrorBlock = () => {
    KlassRequireString.create({
      attrs: {}
    });
  };

  assert.throws(noStringErrorBlock, (error) => {
    return Ember.isPresent(error.message.match(/someString/));
  }, 'throws error message when missing required string attr');

  /* jshint ignore: start */
  @requiredAttr('someDate', Date)
  /* jshint ignore: end */
  class KlassRequireDate extends Ember.Component.extend({}) { }
  const noDateErrorBlock = () => {
    KlassRequireDate.create({
      attrs: {}
    });
  };

  assert.throws(noDateErrorBlock, (error) => {
    return Ember.isPresent(error.message.match(/someDate/));
  }, 'throws error message when missing required date attr');

  /* jshint ignore: start */
  @requiredAttr('someNumber', Number)
  /* jshint ignore: end */
  class KlassRequireNumber extends Ember.Component.extend({}) { }
  const noNumberErrorBlock = () => {
    KlassRequireNumber.create({
      attrs: {}
    });
  };

  assert.throws(noNumberErrorBlock, (error) => {
    return Ember.isPresent(error.message.match(/someNumber/));
  }, 'throws error message when missing required Number attr');
});

test('throws when provided attr type does not match required type', (assert) => {
  /* jshint ignore: start */
  @requiredAttr('someString', String)
  /* jshint ignore: end */
  class KlassRequireString extends Ember.Component.extend({}) { }
  const noStringErrorBlock = () => {
    KlassRequireString.create({
      attrs: {
        someString: 1
      }
    });
  };

  assert.throws(noStringErrorBlock, (error) => {
    return Ember.isPresent(error.message.match(/someString/));
  }, 'throws error message when attr is not String');

  /* jshint ignore: start */
  @requiredAttr('someDate', Date)
  /* jshint ignore: end */
  class KlassRequireDate extends Ember.Component.extend({}) { }
  const noDateErrorBlock = () => {
    KlassRequireDate.create({
      attrs: {
        someDate: ''
      }
    });
  };

  assert.throws(noDateErrorBlock, (error) => {
    return Ember.isPresent(error.message.match(/someDate/));
  }, 'throws error message when attr is not Date');

  /* jshint ignore: start */
  @requiredAttr('someNumber', Number)
  /* jshint ignore: end */
  class KlassRequireNumber extends Ember.Component.extend({}) { }
  const noNumberErrorBlock = () => {
    KlassRequireNumber.create({
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
  /* jshint ignore: start */
  @requiredAttr('someString', String)
  /* jshint ignore: end */
  class KlassRequireString extends Ember.Component.extend({}) { }
  const objectWithStringAttr = KlassRequireString.create({
    attrs: {
      someString: ''
    }
  });

  assert.ok(objectWithStringAttr, 'does not throw when required attr is provided');

  /* jshint ignore: start */
  @requiredAttr('someDate', Date)
  /* jshint ignore: end */
  class KlassRequireDate extends Ember.Component.extend({}) { }
  const objectWithDateAttr = KlassRequireDate.create({
    attrs: {
      someDate: new Date()
    }
  });

  assert.ok(objectWithDateAttr, 'does not throw when required attr is provided');

  /* jshint ignore: start */
  @requiredAttr('someNumber', Number)
  /* jshint ignore: end */
  class KlassRequireNumber extends Ember.Component.extend({}) { }
  const objectWithNumberAttr = KlassRequireNumber.create({
    attrs: {
      someNumber: 1
    }
  });

  assert.ok(objectWithNumberAttr, 'does not throw when required attr is provided');
});
