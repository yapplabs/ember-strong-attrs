import Ember from 'ember';
import { declareStrongAttrs } from 'ember-strong-attrs';
import Person from '../models/person';

export default declareStrongAttrs(function() {
  this.requiredAttr('myRequiredAttr', String);
  this.optionalAttr('myStringAttr', String);
  this.optionalAttr('myPersonAttr', Person);
}, Ember.Component.extend({
  // props and methods
}));
