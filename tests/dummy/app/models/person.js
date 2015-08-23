import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  firstName: DS.attr(),
  lastName: DS.attr(),
  fullName: Ember.computed('firstName', 'lastName', function(){
    return Ember.A([this.get('firstName'), this.get('lastName')]).compact().join(' ');
  })
});
