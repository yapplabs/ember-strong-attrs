import Ember from 'ember';
/* jshint ignore: start */
import { requiredAttr, optionalAttr } from 'ember-strong-attrs';
/* jshint ignore: end */

/* jshint ignore: start */
@requiredAttr('myRequiredString', String)
@requiredAttr('myRequiredNumber', Number)
@optionalAttr('myOptionalString', String)
@optionalAttr('myOptionalNumber', Number)
/* jshint ignore: end */
export default class extends Ember.Component.extend({
}) {
}

