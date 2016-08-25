/**
 * @function defer
 * @desc Pauses JS execution to let the rendering threads catch up.  This is the effect that
 * setTimeout() with a timeout of 0 does. Although it seems to say "run this immediately" it
 * actually gives the browser a chance to finish doing some non-JS things that have been
 * waiting to finish before attending to this new piece of code.
 * @credit http://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful
 * @param {function} func function to run
 */
const defer = func => {
    if (typeof func === 'function') {
        setTimeout(func, 0);
    }
};


export default defer;
