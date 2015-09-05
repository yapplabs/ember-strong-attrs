import Ember from 'ember';
import { declareStrongAttrs } from 'ember-strong-attrs';

export default declareStrongAttrs(function() {
  this.requiredAttr('myRequiredString', String);
  this.requiredAttr('myRequiredNumber', Number);
  this.optionalAttr('myOptionalString', String);
  this.optionalAttr('myOptionalNumber', Number);
}, Ember.Component.extend({
  // props and methods
}));
