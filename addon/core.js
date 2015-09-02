import Ember from 'ember';

export const declaredStrongAttrsKey = 'declaredStrongAttrs';

export function declareAttr(target, attrName, attrType, isRequired) {
  ensureDeclaredStrongAttrs(target);

  target[declaredStrongAttrsKey].push({
    name: attrName,
    type: attrType,
    required: isRequired
  });
}

export function validateType(declaredAttr, val, component) {
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

export function throwInvalidTypeError(declaredAttr, val, component) {
  throw new Error(`Component ${component.toString()} expected attribute '${declaredAttr.name}' to be of type '${typeToString(declaredAttr.type)}'. Was '${val}'`);
}

export function throwMissingError(declaredAttr, component) {
  throw new Error(`Component ${component.toString()} missing required attribute '${declaredAttr.name}'. Expected type '${typeToString(declaredAttr.type)}'`);
}

function ensureDeclaredStrongAttrs(target) {
  let missingDeclaredStrongsAttrs = true;
  for (let prop in target) {
    if (prop === declaredStrongAttrsKey) {
      missingDeclaredStrongsAttrs = false;
    }
  }

  if (missingDeclaredStrongsAttrs) {
    Object.defineProperty(target, declaredStrongAttrsKey, {
      writable: false,
      configurable: false,
      enumerable: true,
      value: []
    });
  }
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

