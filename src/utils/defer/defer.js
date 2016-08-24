/**
 * @function defer
 * @desc Prevents function triggering until completion
 * @param {function} func function to run
 */
const defer = func => {
    if (typeof func === 'function') setTimeout(func, 0);
};

export default defer;
