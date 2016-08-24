/**
 * @function trapFocus
 * @desc Traps focus within an element
 * @param {Event} e
 * @param {array} focusableElements array of nodes that can be focussed
 */
const trapFocus = (e, focusableElements) => {

    const currentFocusIndex = focusableElements.indexOf(document.activeElement);

    // If shift held and first element active focus last element
    if (e.shiftKey && currentFocusIndex === 0) {
        focusableElements[focusableElements.length - 1].focus();
        e.preventDefault();

    // If shift not held and last element active focus first element
    } else if (!e.shiftKey && currentFocusIndex === focusableElements.length - 1) {
        focusableElements[0].focus();
        e.preventDefault();
    }
};


export default trapFocus;
