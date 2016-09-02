/**
 * @function isAlphaNumeric
 * @desc Checks if a keycode is alphanumeric
 * > 47 && < 58 numeric (0-9)
 * > 64 && < 91 upper alpha (A-Z)
 * > 96 && < 123 lower alpha (a-z)
 * @param {number} code the keycode
 * @return {boolean} whether or not number is alphanumeric
 */
const isAlphaNumeric = code => (code > 47 && code < 58) ||
    (code > 64 && code < 91) ||
    (code > 96 && code < 123);


export default isAlphaNumeric;
