import Ember from 'ember';
import { requiredAttr, optionalAttr } from 'ember-strong-attrs';
import Person from '../models/person';

@requiredAttr('myRequiredAttr', String)
@optionalAttr('myStringAttr', String)
@optionalAttr('myPersonAttr', Person)
export default class extends Ember.Component.extend({
}) {
}

