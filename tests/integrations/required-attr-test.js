import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('example-with-decorations', 'requiredAttrs test', {
  integration: true
});

test('throws when missing required attrs', function(assert) {
  assert.expect(2);

  const noStringErrorBlock = () => {
    this.render(hbs`{{example-with-decorations myRequiredNumber=1}}`);
    return true;
  };

  assert.throws(noStringErrorBlock, (error) => {
    return Ember.isPresent(error.message.match(/myRequiredString/));
  }, 'throws error message when missing required string attr');

  const noNumberErrorBlock = () => {
    this.render(hbs`{{example-with-decorations myRequiredString="string1"}}`);
    return true;
  };

  assert.throws(noNumberErrorBlock, (error) => {
    return Ember.isPresent(error.message.match(/myRequiredNumber/));
  }, 'throws error message when missing required Number attr');
});

test('throws when provided attr type does not match specified type', function(assert) {
  assert.expect(2);

  const noStringErrorBlock = () => {
    this.render(hbs`{{example-with-decorations myRequiredString=1 myRequiredNumber=2}}`);
    return true;
  };

  assert.throws(noStringErrorBlock, (error) => {
    return Ember.isPresent(error.message.match(/myRequiredString/));
  }, 'throws error message when missing required string attr');

  const noNumberErrorBlock = () => {
    this.render(hbs`{{example-with-decorations myRequiredString="string1" myRequiredNumber="string2"}}`);
    return true;
  };

  assert.throws(noNumberErrorBlock, (error) => {
    return Ember.isPresent(error.message.match(/myRequiredNumber/));
  }, 'throws error message when missing required Number attr');
});

test('does not throw when required attrs are provided', function(assert) {
  assert.expect(1);

  const noErrorsBlock = () => {
    this.render(hbs`{{example-with-decorations myRequiredString="string1" myRequiredNumber=1}}`);
    return true;
  };

  assert.ok(noErrorsBlock(),
    'does not throw error message when required attrs are provided');
});
