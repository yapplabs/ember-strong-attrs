import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('missing-required');
  this.route('wrong-type-required');
  this.route('wrong-type-string');
  this.route('wrong-model-type');
});

export default Router;
