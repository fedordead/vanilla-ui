import {keyCodes, defaultClassNames, NATIVELY_FOCUSABLE_ELEMENTS} from '../../constants';

import createEl from '../../utils/createEl';
import defer from '../../utils/defer';
import qa from '../../utils/qa';
import trapFocus from '../../utils/trapFocus';


/**
 * @function UIDialog
 * @version 0.0.2
 * @desc Main UIDialog function. Creates instances of the dialog based on
 * parameters passed in.
 * @param {object} settings
 */
const UIDialog = ({
        dialog = '.js-dialog',
        openBtn = '.js-dialog-btn',
        closeBtn = '.js-dialog-close-btn',
        isModal = false,
        isAlert = false,
        readyClass = defaultClassNames.IS_READY,
        activeClass = defaultClassNames.IS_ACTIVE,
        showBackdrop = true
    } = {}) => {

    // Stores all the dom nodes for the module
    let DOM = {
        dialogs: qa(dialog)
    };

    // Keeps track of current state
    let state = {
        currentOpenButton: null,
        currentDialog: null,
        focusableElements: null //  elements within modal
    };


    /**
     * @function bindBackdropEvents
     * @desc Adds event listener for clicking on backdrop
     */
    function bindBackdropEvents() {
        DOM.backdrop.addEventListener('click', handleBackdropClick);
    }


    /**
     * @function unbindBackdropEvents
     * @desc Removes event listener for clicking on backdrop
     */
    function unbindBackdropEvents() {
        DOM.backdrop.removeEventListener('click', handleBackdropClick);
    }


    /**
     * @function handleBackdropClick
     * @desc If backdrop has been clicked, dismiss dialog
     * @param {Event} e
     */
    function handleBackdropClick(e) {
        if (e.target === DOM.backdrop) {
            hideDialog(state.currentDialog);
        }
    }


    /**
     * @function createBackdrop
     * @desc Creates the dialog backdrop
     */
    function createBackdrop() {
        // Create the backdrop
        DOM.backdrop = createEl({id: 'hawk', className: defaultClassNames.DIALOG_BACKDROP});

        addBackdropA11y(DOM.backdrop);
    }


    /**
     * @function addBackdropA11y
     * @desc Applies relevant roles and attributes to the backdrop
     * @param {node} backdrop
     */
    function addBackdropA11y(backdrop) {
        backdrop.setAttribute('aria-hidden', true);
    }


    /**
     * @function addDialogA11y
     * @desc Applies relevant roles and attributes to the dialog
     * @param {node} dialog
     */
    function addDialogA11y(dialog) {
        const role = isAlert ? 'alertdialog' : 'dialog';

        dialog.setAttribute('aria-hidden', 'true');
        dialog.setAttribute('role', role);
    }


    /**
     * @function bindOpenEvents
     * @desc Finds all open buttons and attaches click event listener
     * @param {node} dialog
     */
    function bindOpenEvents(dialog) {
        const id = dialog.getAttribute('id');

        // Grab all buttons which open this instance of the modal
        const openButtons = qa(`${openBtn}[aria-controls="${id}"]`);

        openButtons.forEach(button => button.addEventListener('click', openDialog));
    }


    /**
     * @function openDialog
     * @desc sets up dialog and state ready to be shown
     * @param {node} dialog
     */
    function openDialog(e) {
        // Get trigger button so focus can be returned to it later
        const button = e.target;
        // Get dialog that should be opened
        const dialog = document.getElementById(button.getAttribute('aria-controls'));

        //  Update State
        state.currentOpenButton = button;
        state.currentDialog = dialog;

        showDialog(dialog);
    }


    /**
     * @function showDialog
     * @desc Sets up focusable elements, close and key events and displays modal
     */
    function showDialog(dialog) {
        //  Focus the modal and remove aria attributes
        dialog.setAttribute('tabindex', 0);
        dialog.setAttribute('aria-hidden', false);

        //  Get focusable elements from inside Dialog
        state.focusableElements = qa(NATIVELY_FOCUSABLE_ELEMENTS.join(), dialog);

        //  Set focus to first element, fallback to Dialog.
        if (state.focusableElements.length) {
            // TODO - figure out why this isn't focussing.
            // console.log('found focusable element', state.focusableElements[0]);
            state.focusableElements[0].focus();
        } else {
            dialog.focus();
        }

        //  Bind events
        defer(bindKeyCodeEvents);
        defer(bindCloseEvents);
        if (!isModal && DOM.backdrop) {
            defer(bindBackdropEvents);
        }

        // Add backdrop if needed
        if (DOM.backdrop) {
            DOM.page.appendChild(DOM.backdrop);
        }

        //  Add class to make dialog visible
        dialog.classList.add(activeClass);
    }


    /**
     * @function bindCloseEvents
     * @desc Finds all close buttons and attaches click event listener
     * @param {node} dialog
     */
    function bindCloseEvents(dialog = state.currentDialog) {
        // Grab all buttons which open this instance of the modal
        const closeButtons = qa(closeBtn);

        closeButtons.forEach(button => button.addEventListener('click', closeDialog));
    }


    /**
     * @function closeDialog
     * @desc Sets up dialog ready to be hidden
     */
    function closeDialog() {
        hideDialog(state.currentDialog);
    }


    /**
     * @function hideDialog
     * @desc adds aria attributes and hides dialog, removing backdrop if needed
     * @param {node} dialog
     */
    function hideDialog(dialog) {

        //  show container and focus the dialog
        dialog.setAttribute('aria-hidden', true);
        dialog.removeAttribute('tabindex');

        // Unbind events
        unbindKeyCodeEvents();
        if (!isModal && DOM.backdrop) {
            unbindBackdropEvents();
        }

        //  Remove active state hook class
        dialog.classList.remove(activeClass);

        // Remove backdrop if needed
        if (DOM.backdrop) {
            DOM.page.removeChild(DOM.backdrop);
        }

        // Reset state and return focus to button that opened the dialog
        state.currentOpenButton.focus();
        state.currentOpenButton = null;
        state.currentDialog = null;
    }


    /**
     * @function bindKeyCodeEvents
     * @desc Adds event listener for keydown on the document
     */
    function bindKeyCodeEvents() {
        document.addEventListener('keydown', handleKeyPress);
    }


    /**
     * @function unbindKeyCodeEvents
     * @desc Removes event listener for keydown on the document
     */
    function unbindKeyCodeEvents() {
        document.removeEventListener('keydown', handleKeyPress);
    }


    /**
     * @function handleKeyPress
     * @desc Checks to see if escape (key 27) has been pressed and dialog not modal
     * @param {Event} e
     */
    function handleKeyPress(e) {
        if (e.keyCode === keyCodes.ESCAPE && !isModal) {
            hideDialog(state.currentDialog);
        }

        if (e.keyCode === keyCodes.TAB && !isModal) {
            trapFocus(e, state.focusableElements);
        }
    }


    /**
     * @function init
     * @desc Initialises the dialog
     */
    function init() {

        // Check if any dialogs exist, return if not
        if (DOM.dialogs === undefined) {
            return false;
        }

        // Add body element to the DOM object
        DOM.page = qa('body')[0];

        if (showBackdrop) {
            createBackdrop();
        }

        DOM.dialogs.forEach(dialog => {
            // Add accessibility to dialog
            addDialogA11y(dialog);

            // Set up event listeners for opening dialog
            bindOpenEvents(dialog);

            // Set ready class
            dialog.classList.add(readyClass);
        });
    }

    // Initialise UIDialog module
    init();
};


export default UIDialog;
