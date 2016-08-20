/**
 * @function createEl
 * @desc creates an element from an object
 * @param {object} param attributes for element
 * @param {string} param.element the type of element to create
 * @param {array} param.children a list of child element objects
 * @param {string} param.className a list of classes to be applied
 * @param {string} param.text text value for the element
 * @param {object} ...attributes any other attributes passed in.  Must be provided in camelcase
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

    // Adds classes
    if (className) {
        // Converts string to array so spread will work
        if (typeof className === 'string') {
            className = [className];
        }

        el.classList.add(...className);
    }

    if (text) {
        const elText = document.createTextNode(text);

        el.appendChild(elText);
    }

    // Adds other attributes e.g id, type, role etc provided
    if (attributes !== {}) {
        for (let key in attributes) {

            // check if attribute is an event listener
            if (key.substring(0, 2) === 'on') {
                el.addEventListener(key.substring(2).toLowerCase(), attributes[key]);
            } else {
                el.setAttribute(key, attributes[key]);
            }
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
