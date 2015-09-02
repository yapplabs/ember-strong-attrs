import Ember from 'ember';
import {
  declaredStrongAttrsKey,
  declareAttr,
  validateType,
  throwMissingError,
} from 'ember-strong-attrs/core';

let extendedComponent = false;

if (!extendedComponent) {
  Ember.Component.reopen({
    checkStrongAttrs: Ember.on('init', function() {
      const declaredStrongAttrs = this.constructor[declaredStrongAttrsKey];

      if (!declaredStrongAttrs) { return; }

      declaredStrongAttrs.forEach((declaredAttr) => {
        const val = this.getAttr(declaredAttr.name);
        const isUndefined = val === undefined;

        if (isUndefined && declaredAttr.required) {
          throwMissingError(declaredAttr, this);
        }

        if (declaredAttr.type && !isUndefined) {
          validateType(declaredAttr, val, this);
        }
      });
    })
  });

  extendedComponent = true;
}

export function requiredAttr(attrName, attrType) {
  return function(target) {
    declareAttr(target, attrName, attrType, true);
  };
}

export function optionalAttr(attrName, attrType) {
  return function(target) {
    declareAttr(target, attrName, attrType, false);
  };
}

export function declareStrongAttrs(attrsFunc, target) {
  // inject DSL methods that closed upon the target object
  attrsFunc.requiredAttr = function(attrName, attrType) {
    declareAttr(target, attrName, attrType, true);
  };

  attrsFunc.optionalAttr = function(attrName, attrType) {
    declareAttr(target, attrName, attrType, false);
  };

  attrsFunc.call(attrsFunc);

  return target;
}
