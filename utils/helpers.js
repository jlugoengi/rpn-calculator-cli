module.exports = {
  isEmptyArray: (arr) => Array.isArray(arr) && arr.length == 0,
  isArrayOfNumbers: (arr) => Array.isArray(arr) && !arr.some(isNaN),
  deepClone: (obj) => JSON.parse(JSON.stringify(obj)),
  arrayGetLast: (arr) => arr.slice(-1)[0],
};
