const assert = require('assert');

const ARRAY_OPTIONS = {
  types: 'type',
  countries: 'country',
  adminDivisions1: 'adminDivision1',
  adminDivisions2: 'adminDivision2'
};

const ARRAY_KEYS = Object.keys(ARRAY_OPTIONS);

function parseArrayOptions(options) {
  return Object.keys(options).reduce((result, key) => {
    const value = options[key];

    if (!ARRAY_KEYS.includes(key)) return { ...result, [key]: value };
    if (!value) return result;

    assert(Array.isArray(value), `Expected parameter "${key}" to be an array`);
    const newKey = ARRAY_OPTIONS[key];
    const newValue = value.join(',');
    return { ...result, [newKey]: newValue };
  }, {});
}

module.exports = parseArrayOptions;
