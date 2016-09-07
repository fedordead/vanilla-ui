import {KEYCODES, DEFAULT_CLASSNAMES} from '../../constants';

import createEl from '../../utils/createEl';
import keycodeIsAlphaNumeric from '../../utils/keycodeIsAlphaNumeric';
import nodeMap from '../../utils/nodeMap';
import qa from '../../utils/qa';
import traverseList from '../../utils/traverseList';


/**
 * @function VUITypeahead
 * @version 0.0.2
 * @desc Main VUITypeahead function. Creates instances of the typeahead based on
 * parameters passed in.
 * @param {object} settings
 */
const VUITypeahead = ({
        typeahead = '.js-typeahead',
        toggleBtn = '.js-typeahead-btn',
        readyClass = DEFAULT_CLASSNAMES.isReady,
        activeClass = DEFAULT_CLASSNAMES.isActive,
        noMatchesText = 'No Matches',
        noMatchesClass = 'no-matches',
        maxResults = 2
    } = {}) => {

    // Stores all the constant dom nodes for the component regardless of instance.
    let DOM = {
        typeaheads: qa(typeahead)
    };

    // Keeps track of current instance of typeahead.
    let state = {
        currentInput: null,
        currentDropdown: null,
        currentHiddenInput: null,
        currentHighlighted: null,
        isDropdownOpen: false,
        fullOptions: [],
        subSetOptions: []
    };

    function setState(updates) {
        state = Object.assign(state, updates);
    }


    /**
     * @function handleKeyPress
     * @desc Checks to see which key has been pressed and carries out an action depending
     * @param {Event} e
     */
    function handleKeyPress(e) {

        const alphaNumeric = keycodeIsAlphaNumeric(e.keyCode);

        // Typeahead dropdown closed
        if (!state.isDropdownOpen) {

            // Down arrow or typing a letter should open dropdown.
            if (e.keyCode === KEYCODES.downArrow ||
                alphaNumeric) {
                showTypeahead(state.currentDropdown);
            }

            if (alphaNumeric) {
                updateOptions(e.target.value + e.key);
            }

        // Typeahead dropdown already open:
        } else {

            if (e.keyCode === KEYCODES.escape ||
               (e.keyCode === KEYCODES.backspace && e.target.value.length === 1)) {
                closeDropdown();
            } else if (
                e.keyCode === KEYCODES.upArrow ||
                e.keyCode === KEYCODES.downArrow ||
                (e.keyCode === KEYCODES.upArrow && e.altKey) ||
                (e.keyCode === KEYCODES.downArrow && e.altKey)
                ) {

                // Move up and down list
                const highlightedOption = traverseList(e.keyCode,
                                                       state.currentDropdown.children,
                                                       state.currentHighlighted);

                // Update state
                setState({
                    currentHighlighted: highlightedOption;
                });
                state.currentInput.value = highlightedOption.innerText;


            } else if (e.keyCode === KEYCODES.enter) {
                handleEnter(e);
            } else if (alphaNumeric) {
                updateOptions(e.target.value + e.key);
            }
        }
    }


    /**
     * @function updateOptions
     * @desc Filters list of options according to user input.
     * @param {string} inputValue - current value in text field
     */
    function updateOptions(inputValue) {

        // Create subset of options based on word typed.
        setState({
            subSetOptions: state.fullOptions.filter(val => val.innerText.toLowerCase().includes(inputValue));
        });

        // Fall back for no matches.
        if (!state.subSetOptions.length) {
            setState({
                subSetOptions: [
                createEl(createDropdownItem({
                    text: noMatchesText,
                    className: noMatchesClass})
                    )
                ];
            });
        }

        // Create new dropdown element with same props.
        const dropDown = createEl(generateDropdown());

        dropDown.classList.add(DEFAULT_CLASSNAMES.isActive);

        // Add new subset to the new dropdown.
        state.subSetOptions.forEach(option => dropDown.appendChild(option));

        // Switch out old dropdown list with updated nodeList.
        state.currentDropdown.parentNode.replaceChild(
            dropDown,
            state.currentDropdown
        );

        // Update State.
        state.currentDropdown = dropDown;
    }


    /**
     * @function setCurrentTypeahead
     * @desc Sets up typeahead and state ready to be shown
     * @param {Event} e
     */
    function setCurrentTypeahead(e) {

        // if the instance of typeahead already exists, don't reinstantiate
        if (state.currentInput) {
            return;
        }

        // Get trigger input so focus can be returned to it later.  || e for when element is passed from button
        const input = e.target || e;
        // Get dialog that should be opened
        const dropdown =
            document.getElementById(input.getAttribute('aria-owns')) ||
            document.getElementById(input.getAttribute('aria-controls'));

        //  Update State
        state.currentInput = input;
        state.currentDropdown = dropdown;
        // Return alphabetical array of options
        state.fullOptions = [].slice.call(dropdown.children).sort((obj1, obj2) => obj1.innerText > obj2.innerText);

        state.subSetOptions = setSubSetOptions(state.fullOptions, maxResults);
    }


    /**
     * @function setSubSetOptions
     * @desc Limit results to max.
     * @param {array} fullOptions - all results for search criteria
     * @param {number} max - max number of options shown in typeahead
     */
    function setSubSetOptions(fullOptions, max) {
        return [].slice.call(fullOptions, max);
    }


    /**
     * @function showTypeahead
     * @desc Displays the dropdown for the Typeahead
     * @param {node} dropdown - the dropdown part of the current Typehead instance
     */
    function showTypeahead(dropdown) {
        //  Remove aria attributes update State
        dropdown.setAttribute('aria-hidden', false);

        setState({
            isDropdownOpen: true
        });

        bindClickEvents(dropdown);

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
     * @param {string} params.className
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


    /**
     * @function generateDropdown
     * @desc Creates the markup for the dropdown with it's options.
     * @param {array} options - array of objects to populate the dropdown.
     */
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


    /**
     * @function removeTypeahead
     * @desc Hides the Typeahead
     * @param {Event} e - clicked item in the dropdown.
     */
    function removeTypeahead(e) {
        console.dir(e.target);
    }


    /**
     * @function typeaheadButtonClick
     * @desc Toggle button that opens and closes the dropdown
     * @param {Event} e - clicked button.
     */
    function typeaheadButtonClick(e) {
        if (!state.currentDropdown) {
            setCurrentTypeahead(e.target.previousSibling);
        }

        if (state.isDropdownOpen) {
            closeDropdown();
        } else {
            showTypeahead(state.currentDropdown);
        }

        //return focus to input
        state.currentInput.focus();
    };


    /**
     * @function createTypeaheadElement
     * @desc Creates the core typeahead UI
     * @param {object} params
     * @param {string} params.id
     * @param {string} params.text
     * @param {string} params.name
     * @param {object} params.options
     */
    function createTypeaheadElement({id, text, name, options}) {

        // This hidden input takes the properties of
        // the replaced `<select>` element.
        const hiddenInput = {
            element: 'input',
            type: 'hidden',
            id, // <select> Id
            name // <select> name
        };

        // The type box
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
            onFocus: setCurrentTypeahead,
            onBlur: removeTypeahead
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
            className: 'c-typeahead__button',
            ['aria-controls']: 'js-typeahead',
            tabindex: -1,
            type: 'button',
            onClick: typeaheadButtonClick
        };

        // Wrapper for the non-dropdown elements
        const typeaheadField = {
            className: 'c-typeahead__field',
            children: [textInputLabel, textInput, button, hiddenInput]
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
     * @param {node} node the dom node containing the form elements
     * @return {object} parts of the dom node we need
     */
    function extractSelect(node) {
        const select = node.children[1];

        const label = node.children[0];

        return {
            id: select.id,
            name: select.name,
            options: select.options,
            text: label.innerText
        };
    }


    /**
     * @function handleClick
     * @desc Handles the option clicked on in the dropdown
     * @param {Event} e - clicked option.
     */
    function handleClick(e) {
        setValue(e.target);
        closeDropdown();
    }


    /**
     * @function handleEnter
     * @desc event handler for when enter key pressed
     */
    function handleEnter() {
        setValue(state.currentHighlighted);
    }


    /**
     * @function setValue
     * @desc sets the value of the text input part of the Typeahead.
     * @param {node} option - selected option.
     */
    function setValue(option) {
        state.currentInput.value = option.innerText;
        // state.currentHiddenInput.value = option.dataset.value;
        closeDropdown();
    }


    /**
     * @function closeDropdown
     * @desc adds aria attributes and hides typeahead, removing backdrop if needed
     * @param {node} typeahead
     */
    function closeDropdown() {

        //  show container and focus the typeahead
        state.currentDropdown.setAttribute('aria-hidden', true);
        state.currentDropdown.removeAttribute('tabindex');

        //  Remove active state hook class
        state.currentDropdown.classList.remove(activeClass);

        // Return focus to input that opened the typeahead, close dropdown
        state.currentInput.focus();
        state.isDropdownOpen = false;
    }


    /**
     * @function bindClickEvents
     * @desc adds click event to the dropdown
     * @param {node} dialog
     */
    function bindClickEvents(dropdown) {
        dropdown.addEventListener('click', handleClick);
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

    // Initialise VUITypeahead component
    init();
};


export default VUITypeahead;
