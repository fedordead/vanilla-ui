import {keyCodes, defaultClassNames, focusableSelectors} from '../../constants';
import qa from '../../utils/qa';
import defer from '../../utils/defer';

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
     * @function createBackdrop
     * @type private
     * @desc Creates the dialog backdrop
     */
    function createBackdrop() {
        // Create the backdrop
        DOM.backdrop = document.createElement('div');

        DOM.backdrop.classList.add(defaultClassNames.DIALOG_BACKDROP);

        addBackdropA11y(DOM.backdrop);
    }


    /**
     * @function addDialogA11y
     * @type private
     * @desc Applies relevant roles and attributes to the dialog
     * @param {node} dialog
     */
    function addDialogA11y(dialog) {
        const role = isAlert ? 'alertdialog' : 'dialog';

        dialog.setAttribute('aria-hidden', 'true');
        dialog.setAttribute('role', role);
    }


    /**
     * @function addBackdropA11y
     * @type private
     * @desc Applies relevant roles and attributes to the backdrop
     * @param {node} backdrop
     */
    function addBackdropA11y(backdrop) {
        backdrop.setAttribute('aria-hidden', true);
    }

    /**
     * @function closeDialog
     * @type private
     * @desc sets up dialog ready to be hidden
     * @param {node} dialog
     */
    function closeDialog() {
        hideDialog(state.currentDialog);
    }

    /**
     * @function hideDialog
     * @type private
     * @desc adds aria attributes and hides dialog
     * @param {node} dialog
     */
    function hideDialog(dialog) {

        //  show container and focus the dialog
        dialog.setAttribute('aria-hidden', true);
        dialog.removeAttribute('tabindex');

        // TODO - Unbind events

        //  remove active state hook class
        dialog.classList.remove(activeClass);

        // Remove backdrop if needed
        if (DOM.backdrop) {
            DOM.page.removeChild(DOM.backdrop);
        }

        //  return focus to button that opened the dialog and reset state
        state.currentOpenButton.focus();
        state.currentOpenButton = null;
        state.currentDialog = null;
    }


    /**
     * @function openDialog
     * @type private
     * @desc sets up dialog and state ready to be shown
     * @param {node} dialog
     */
    function openDialog(e) {
        // get trigger button so focus can be returned to it later
        const button = e.target;
        // get dialog that should be opened
        const dialog = document.getElementById(button.getAttribute('aria-controls'));

        //  update State
        state.currentOpenButton = button;
        state.currentDialog = dialog;

        showDialog(dialog);
    }


    /**
     * @function bindOpenEvents
     * @type private
     * @desc Finds all open buttons and attaches click event listener
     * @param {node} dialog
     */
    function bindOpenEvents(dialog) {
        const id = dialog.getAttribute('id');

        // Grab all buttons which open this instance of the modal
        let openButtons = qa(`${openBtn}[aria-controls="${id}"]`);

        openButtons.forEach(button => button.addEventListener('click', openDialog));
    }


    /**
     * @function bindCloseEvents
     * @type private
     * @desc Finds all close buttons and attaches click event listener
     * @param {node} dialog
     */
    function bindCloseEvents(dialog = state.currentDialog) {
        // Grab all buttons which open this instance of the modal
        let closeButtons = qa(closeBtn);

        closeButtons.forEach(button => button.addEventListener('click', closeDialog));
    }


    /**
     * @function bindKeyCodeEvents
     * @type private
     * @desc Adds event listener for keydown on the document
     */
    function bindKeyCodeEvents() {
        document.addEventListener('keydown', handleKeyPress);
    }

    /**
     * @function bindBackdropEvents
     * @type private
     * @desc Adds event listener for keydown on the document
     */
    function bindBackdropEvents() {
        DOM.backdrop.addEventListener('click', handleBackdropClick);
    }


    /**
     * @function showDialog
     * @type private
     * @desc Sets up focusable elements, close and key events and displays modal
     */
    function showDialog(dialog) {
        //  Focus the modal and remove aria attributes
        dialog.setAttribute('tabindex', 1);
        dialog.setAttribute('aria-hidden', false);

        //  set first/last focusable elements
        state.focusableElements = qa(focusableSelectors.join(), dialog);

        //  focus first element if exists, otherwise focus dialog element
        if (state.focusableElements.length) {
            state.focusableElements[0].focus();
        } else {
            dialog.focus();
        }

        //  Bind events
        defer(bindKeyCodeEvents);
        defer(bindCloseEvents);
        if (!isModal && DOM.backdrop) defer(bindBackdropEvents);

        // Add backdrop if needed
        if (DOM.backdrop) {
            DOM.page.appendChild(DOM.backdrop);
        }

        //  Add class to make dialog visible
        dialog.classList.add(activeClass);
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
            // add accessibility to dialog
            addDialogA11y(dialog);

            // set up event listeners for opening dialog
            bindOpenEvents(dialog);

            // set ready class
            dialog.classList.add(readyClass);
        });
    }

    // Initialise UIDialog module
    init();
};


export default UIDialog;
