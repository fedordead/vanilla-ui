/**
 * @function createEl
 * @desc creates an element from an object
 * @param {object} attributes for element
 * @param {string} element the type of element to create
 * @param {string} className a list of classes to be applied
 * @param {object} attributes any other attributes passed in.  Must be provided in camelcase
 * @return {node} - Element with all applied attributes.
 */

const createEl = ({
        element = 'div',
        className,
        ...attributes
    } = {}) => {

    // Setup base element
    let el = document.createElement(element);

    // adds classes
    if (className) {
        el.classList.add(className);
    }

    // Adds other attributes e.g id, type, role etc provided
    if (attributes !== {}) {
        for (let key in attributes) {
            el.setAttribute(key, attributes[key]);
        }
    }

    return el;
};


export default createEl;
