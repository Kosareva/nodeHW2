/**
 * Returns true if each of the source array elements is the part of the second array
 *
 * @param {array} source
 * @param {array} constraint
 * @return {boolean}
 */
function containsOnly(source, constraint) {
  if (!Array.isArray(source)) {
    throw new Error('source should be an array');
  }
  if (!Array.isArray(constraint)) {
    throw new Error('constraint should be an array');
  }
  return !source.some(elem => !constraint.includes(elem));
}

module.exports = {
  containsOnly
};
