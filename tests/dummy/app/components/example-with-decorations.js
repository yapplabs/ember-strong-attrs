import Ember from 'ember';
import { requiredAttr, optionalAttr } from 'ember-strong-attrs';
import Person from '../models/person';

/* jshint ignore: start */
@requiredAttr('myRequiredAttr', String)
@optionalAttr('myStringAttr', String)
@optionalAttr('myPersonAttr', Person)
/* jshint ignore: end */
export default class extends Ember.Component.extend({
}) {
}

