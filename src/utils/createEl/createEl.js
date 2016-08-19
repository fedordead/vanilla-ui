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
        children,
        className,
        text,
        ...attributes
    } = {}) => {

    // Setup base element
    let el = document.createElement(element);

    // adds classes
    if (className) {
        el.classList.add(className);
    }

    if (text) {
        const elText = document.createTextNode(text);

        el.appendChild(elText);
    }

    // Adds other attributes e.g id, type, role etc provided
    if (attributes !== {}) {
        for (let key in attributes) {
            el.setAttribute(key, attributes[key]);
        }
    }

    // Create new element for each child and append
    if (children) {
        children.forEach(child => {
            const el2 = createEl(child);

            el.appendChild(el2);
        });
    }

    return el;
};


export default createEl;
