import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr(),
  ownerFamilyName: DS.attr(),
  fullName: Ember.computed('name', 'ownerFamilyName', function(){
    return `${this.get('name')} of ${this.get('ownerFamilyName')}`;
  })
});
