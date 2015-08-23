import Ember from 'ember';
export default Ember.Controller.extend({
  dog: Ember.computed(function(){
    return this.store.createRecord('dog', {
      name: 'Woofie',
      ownerFamilyName: 'Doe'
    });
  })
});
