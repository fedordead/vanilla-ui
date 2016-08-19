import {keyCodes, defaultClassNames, NATIVELY_FOCUSABLE_ELEMENTS} from '../../constants';

import createEl from '../../utils/createEl';
// import defer from '../../utils/defer';
import qa from '../../utils/qa';
// import trapFocus from '../../utils/trapFocus';


/**
 * @function UITypeahead
 * @version 0.0.2
 * @desc Main UITypeahead function. Creates instances of the typeahead based on
 * parameters passed in.
 * @param {object} settings
 */
const UITypeahead = ({
        typeahead = '.js-typeahead',
        toggleBtn = '.js-typeahead-btn',
        readyClass = defaultClassNames.IS_READY,
        activeClass = defaultClassNames.IS_ACTIVE
    } = {}) => {

    // Stores all the dom nodes for the module
    let DOM = {
        typeaheads: qa(typeahead)
    };

    // Keeps track of current state
    let state = {
        currentOpenButton: null,
        currenttypeahead: null,
        focusableElements: null //  elements within modal
    };

    const createDropdownItem = ({value, name = 'typer', id, text}) => {

        const input = {
            element: 'input',
            type: 'radio',
            value,
            name,
            id: text
        };

        const label = {
            element: 'label',
            for: text,
            text
        };

        return {
            element: 'li',
            children: [input, label]
        };
    };

    function generateOptions(options) {
        return [].slice.call(options).map(option => {
            return createDropdownItem(option);
        });
    }


    /**
     * @function createTypeaheadElement
     * @desc Creates the dialog backdrop
     */
    function createTypeaheadElement({id, text, name, options}) {

        const textInput = {
            element: 'input',
            type: 'text',
            className: 'c-typeahead__input',
            value: '',
            id,
            name
        };

        const textInputLabel = {
            className: 'c-typeahead__label',
            element: 'label',
            for: id,
            text
        };

        const button = {
            element: 'button',
            text: 'Show All'
        };

        const typeaheadField = {
            className: 'c-typeahead__field',
            children: [textInputLabel, textInput, button]
        };

        const typeaheadDropdown = {
            className: 'c-typeahead__dropdown',
            children: [{
                element: 'ul',
                children: generateOptions(options)
            }]
        };

        return createEl({
            className: 'c-typeahead',
            children: [typeaheadField, typeaheadDropdown]
        });
    }

    function extractSelect(typeahead) {
        const select = typeahead.children[1];

        const label = typeahead.children[0];

        return {
            id: select.id,
            name: select.name,
            options: select.options,
            text: label.innerText
        };
    }

    /**
     * @function init
     * @desc Initialises the typeahead
     */
    function init() {

        // Check if any typeaheads exist, return if not
        if (DOM.typeaheads === undefined) {
            return false;
        }

        // Add body element to the DOM object
        DOM.page = qa('body')[0];

        DOM.typeaheads.forEach(typeahead => {

            // Get details of existing element
            const selectWithLabel = extractSelect(typeahead);

            // Create its replacement
            const newTypeahead = createTypeaheadElement(selectWithLabel);

            // Add accessibility to typeahead
            // addTypeaheadA11y(typeahead);

            // Set up event listeners for triggering typeahead
            // bindTriggerEvents(typeahead);

            // Switch out old select with our awesome typeahead component
            typeahead.parentNode.replaceChild(newTypeahead, typeahead);

            // Set ready class
            newTypeahead.classList.add(readyClass);
        });
    }

    // Initialise UITypeahead module
    init();
};


export default UITypeahead;
