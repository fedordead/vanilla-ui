import {keyCodes, defaultClassNames} from '../../constants';

import createEl from '../../utils/createEl';
// import defer from '../../utils/defer';
import qa from '../../utils/qa';
import nodeMap from '../../utils/nodeMap';
import isAlphaNumeric from '../../utils/isAlphaNumeric';


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
        activeClass = defaultClassNames.IS_ACTIVE,
        noMatchesText = 'No Matches',
        noMatchesClass = 'no-matches'
    } = {}) => {

    // Stores all the dom nodes for the module
    let DOM = {
        typeaheads: qa(typeahead)
    };

    // Keeps track of current state
    let state = {
        currentTypeahead: null,
        currentInput: null,
        currentDropdown: null,
        focusableElements: null,
        isDropdownOpen: false,
        fullOptions: [],
        subSetOptions: []
    };


    /**
     * @function handleKeyPress
     * @desc Checks to see if escape (key 27) has been pressed and dialog not modal
     * @param {Event} e
     */
    function handleKeyPress(e) {

        const alphaNumeric = isAlphaNumeric(e.keyCode);

        if (!state.isDropdownOpen) {
            if (e.keyCode === keyCodes.UP_ARROW ||
                e.keyCode === keyCodes.DOWN_ARROW ||
                alphaNumeric) {
                showTypeahead(state.currentDropdown);
            }
        } else {

            if (e.keyCode === keyCodes.ESCAPE) {
                // close typeahead
                // remove event listener for keyhandler
                // clear state
            } else if (e.keyCode === keyCodes.UP_ARROW ||
                e.keyCode === keyCodes.DOWN_ARROW) {
                // move up and down list
            }
        }

        if (alphaNumeric) {
            updateOptions(e.target.value + e.key);
        }

    }

    function updateOptions(inputValue) {

        // create subset of options based on word typed
        state.subSetOptions = state.fullOptions.filter(val => val.innerText.toLowerCase().includes(inputValue));

        // Fall back for no matches
        if (!state.subSetOptions.length) {
            state.subSetOptions = [createEl(createDropdownItem({text: noMatchesText, className: noMatchesClass}))];
        }

        // create new dropdown element with same props
        const dropDown = createEl(generateDropdown());

        dropDown.classList.add(defaultClassNames.IS_ACTIVE);
        // add new subset to the new dropdown

        state.subSetOptions.forEach(option => dropDown.appendChild(option));

        // Switch out old dropdown list with updated nodeList
        state.currentDropdown.parentNode.replaceChild(
            dropDown,
            state.currentDropdown
        );

        // Update State
        state.currentDropdown = dropDown;
    }

    /**
     * @function setCurrentTypeahead
     * @desc sets up typeahead and state ready to be shown
     * @param {node} typeahead
     */
    function setCurrentTypeahead(e) {
        // Get trigger input so focus can be returned to it later
        const input = e.target;
        // Get dialog that should be opened
        const dropdown =
            document.getElementById(input.getAttribute('aria-owns')) ||
            document.getElementById(input.getAttribute('aria-controls'));

        //  Update State
        state.currentInput = input;
        state.currentDropdown = dropdown;
        // Return alphabetical array of options
        state.fullOptions = [].slice.call(dropdown.children).sort((obj1, obj2) => obj1.innerText > obj2.innerText);

        state.subSetOptions = setSubSetOptions(state.fullOptions);
    }

    const MAX_RESULTS = 2;

    function setSubSetOptions(fullOptions) {
        return [].slice.call(fullOptions, MAX_RESULTS);
    }

    /**
     * @function showTypeahead
     * @desc Sets up focusable elements, close and key events and displays modal
     */
    function showTypeahead(dropdown) {
        //  Remove aria attributes update State
        dropdown.setAttribute('aria-hidden', false);
        state.isDropdownOpen = true;

        //  Add class to make dialog visible
        dropdown.classList.add(activeClass);
    }


    /**
     * @function createDropdownItem
     * @desc sets up typeahead and state ready to be shown
     * @param {object} params
     * @param {string} params.value
     * @param {string} params.name
     * @param {string} params.id
     * @param {string} params.text
     */
    const createDropdownItem = ({value, name = 'typer', id, text, className}) => {

        return {
            id: text,
            ['data-value']: value,
            element: 'li',
            role: 'option',
            text,
            tabindex: -1,
            className
        };
    };


    function generateDropdown(options) {

        return {
            className: 'c-typeahead__dropdown',
            element: 'ul',
            id: 'js-typeahead',
            tabindex: -1,
            role: 'listbox',
            ['aria-expanded']: false,
            children: options ? nodeMap(options, createDropdownItem) : null
        };
    }


    function typeaheadButtonClick(e) {
        setCurrentTypeahead(e);
        showTypeahead(state.currentDropdown);
    };

    /**
     * @function createTypeaheadElement
     * @desc Creates the core typeahead UI
     */
    function createTypeaheadElement({id, text, name, options}) {

        const textInput = {
            element: 'input',
            type: 'text',
            className: 'c-typeahead__input',
            value: '',
            id,
            name,
            role: 'combobox',
            ['aria-autocomplete']: 'inline',
            ['aria-owns']: 'js-typeahead',
            tabindex: 0,
            onKeydown: handleKeyPress,
            onFocus: setCurrentTypeahead
        };

        const textInputLabel = {
            className: 'c-typeahead__label',
            element: 'label',
            for: id,
            text
        };

        const button = {
            element: 'button',
            text: 'Open list of options',
            ['aria-controls']: 'js-typeahead',
            tabindex: -1,
            type: 'button',
            onClick: typeaheadButtonClick
        };

        const typeaheadField = {
            className: 'c-typeahead__field',
            children: [textInputLabel, textInput, button]
        };

        return createEl({
            className: 'c-typeahead',
            children: [typeaheadField, generateDropdown(options)]
        });
    }

    /**
     * @function extractSelect
     * @desc Grabs details from the select and label in the dom
     * and convert the relevant parts into an object.
     * @param {node} formControl the dom node containing the form elements
     * @return {object} parts of the dom node we need
     */
    function extractSelect(formControl) {
        const select = formControl.children[1];

        const label = formControl.children[0];

        return {
            id: select.id,
            name: select.name,
            options: select.options,
            text: label.innerText
        };
    }

    /**
     * @function init
     * @desc Initialises the Typeahead
     */
    function init() {

        // Check if any typeaheads exist, return if not
        if (DOM.typeaheads === undefined) {
            return false;
        }

        DOM.typeaheads.forEach(typeahead => {

            // Get details of existing element
            const selectWithLabel = extractSelect(typeahead);

            // Create its replacement
            const newTypeahead = createTypeaheadElement(selectWithLabel);

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
