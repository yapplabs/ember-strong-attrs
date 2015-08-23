import Ember from 'ember';

var extendedComponent = false;
if (!extendedComponent) {
  Ember.Component.reopen({
    checkStrongAttrs: Ember.on('init', function(){
      const declaredStrongAttrs = this.constructor.superclass.declaredStrongAttrs;
      declaredStrongAttrs.forEach((declaredAttr) => {
        const val = this.getAttr(declaredAttr.name);
        const isUndefined = val === undefined;
        if (isUndefined && declaredAttr.required) {
          throw new Error(`Component ${this.toString()} missing required attribute '${declaredAttr.name}'. Expected type '${typeToString(declaredAttr.type)}'`)
        }
        if (declaredAttr.type && !isUndefined) {
          validateType(declaredAttr, val, this);
        }
      });
    })
  });
  extendedComponent = true;
}


export function requiredAttr(attrName, attrType){
  return function(target) {
    declareAttr(target, attrName, attrType, true);
  };
}

export function optionalAttr(attrName, attrType){
  return function(target) {
    declareAttr(target, attrName, attrType, false);
  };
}

function declareAttr(target, attrName, attrType, isRequired) {
  if (!target.declaredStrongAttrs) {
    Object.defineProperty(target, 'declaredStrongAttrs', {
      writable: false,
      configurable: false,
      enumerable: true,
      value: []
    });
  }
  target.declaredStrongAttrs.push({
    name: attrName,
    type: attrType,
    required: isRequired
  });
}

function validateType(declaredAttr, val, component){
  switch (declaredAttr.type) {
    case String:
      if (Ember.typeOf(val) !== 'string') {
        throwInvalidTypeError(declaredAttr, val, component);
      }
      break;
    case Date:
      if (Ember.typeOf(val) !== 'date') {
        throwInvalidTypeError(declaredAttr, val, component);
      }
      break;
    case Number:
      if (Ember.typeOf(val) !== 'number') {
        throwInvalidTypeError(declaredAttr, val, component);
      }
      break;
    default:
      if (!(val instanceof declaredAttr.type)) {
        throwInvalidTypeError(declaredAttr, val, component);
      }
  }
}

function throwInvalidTypeError(declaredAttr, val, component) {
  throw new Error(`Component ${component.toString()} expected attribute '${declaredAttr.name}' to be of type '${typeToString(declaredAttr.type)}'. Was '${val}'`);
}

function typeToString(type) {
  switch (type) {
    case String:
      return 'String';
    case Date:
      return 'Date';
    case Number:
      return 'Number';
    default:
      return type.toString();
  }
}

