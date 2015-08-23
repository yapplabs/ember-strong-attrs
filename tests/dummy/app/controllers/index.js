import Ember from 'ember';
export default Ember.Controller.extend({
  person: Ember.computed(function(){
    return this.store.createRecord('person', {
      firstName: 'John',
      lastName: 'Doe'
    });
  })
});
