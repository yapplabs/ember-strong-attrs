import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('example-with-decorations', 'optionalAttrs test', {
  integration: true
});

test('does not throw when missing optional attrs', function(assert) {
  assert.expect(1);

  const noErrorsBlock = () => {
    this.render(hbs`{{example-with-decorations myRequiredString="string1" myRequiredNumber=1}}`);
    return true;
  };

  assert.ok(noErrorsBlock(),
    'does not throw error message when missing optional attrs');
});

test('throws when provided attr type does not match specified type', function(assert) {
  assert.expect(2);

  const noStringErrorBlock = () => {
    this.render(hbs`{{example-with-decorations myRequiredString="string1" myRequiredNumber=2 myOptionalString=1}}`);
    return true;
  };

  assert.throws(noStringErrorBlock, (error) => {
    return Ember.isPresent(error.message.match(/myOptionalString/));
  }, 'throws error message when missing required string attr');

  const noNumberErrorBlock = () => {
    this.render(hbs`{{example-with-decorations myRequiredString="string1" myRequiredNumber=2 myOptionalNumber="string2"}}`);
    return true;
  };

  assert.throws(noNumberErrorBlock, (error) => {
    return Ember.isPresent(error.message.match(/myOptionalNumber/));
  }, 'throws error message when missing optional Number attr');
});

test('does not throw when optional attrs are provided', function(assert) {
  assert.expect(1);

  const noErrorsBlock = () => {
    this.render(hbs`{{example-with-decorations myRequiredString="string1" myRequiredNumber=1  myOptionalString="string2" myRequiredNumber=2}}`);
    return true;
  };

  assert.ok(noErrorsBlock(),
    'does not throw error message when optional attrs are provided');
});
