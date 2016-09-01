// Constants
import {KEYCODES, DEFAULT_CLASSNAMES, NATIVELY_FOCUSABLE_ELEMENTS} from '../../constants';

// Utils
import createEl from '../../utils/createEl';
import defer from '../../utils/defer';
import qa from '../../utils/qa';
import trapFocus from '../../utils/trapFocus';


/**
 * @function VUIDialog
 * @version 0.0.2
 * @desc Main VUIDialog function. Creates instances of the dialog based on
 * parameters passed in.
 * @param {object} settings
 */
const VUIDialog = ({
        dialog = '.js-dialog',
        openBtn = '.js-dialog-btn-open',
        closeBtn = '.js-dialog-btn-close',
        isModal = false,
        isAlert = false,
        readyClass = DEFAULT_CLASSNAMES.isReady,
        activeClass = DEFAULT_CLASSNAMES.isActive,
        showBackdrop = true
    } = {}) => {

    // Stores all the constant dom nodes for the component regardless of instance.
    let DOM = {
        dialogs: qa(dialog)
    };

    // Keeps track of current instance of dialog.
    let state = {
        currentOpenButton: null,
        currentDialog: null,
        focusableElements: null
    };


    /**
     * @function setState
     * @desc Updates state for component
     * @param {object} updates Changes in state to be assigned.
     */
    function setState(updates) {
        state = Object.assign(state, updates);
    }

    /**
     * @function setDOM
     * @desc Updates DOM
     * @param {object} updates Changes in DOM to be assigned.
     */
    function setDOM(updates) {
        DOM = Object.assign(state, updates);
    }


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
            closeDialog(state.currentDialog);
        }
    }


    /**
     * @function createBackdrop
     * @desc Creates the dialog backdrop
     */
    function createBackdrop() {
        setDOM({
            backdrop: createEl({className: DEFAULT_CLASSNAMES.backdrop})
        });
    }


    /**
     * @function bindOpenEvents
     * @desc Finds all open buttons and attaches click event listener
     * @param {node} dialog
     */
    function bindOpenEvents(dialog) {
        const id = dialog.getAttribute('id');

        // Grab all buttons which open this instance of the dialog
        const openButtons = qa(`${openBtn}[data-controls-dialog="${id}"]`);

        // Loop through all buttons that open modal and attach event listener
        openButtons.forEach(button => button.addEventListener('click', openDialog));
    }


    /**
     * @function openDialog
     * @desc Sets up dialog and state ready to be shown. Is triggered by user clicking on open
     * button. Also sets up focusable elements, close and key events and displays dialog
     * @param {Event} e
     */
    function openDialog(e) {
        // Get trigger button so focus can be returned to it later
        const button = e.target;

        // Get dialog that should be opened
        const dialog = document.getElementById(button.getAttribute('data-controls-dialog'));

        // Update State
        setState({
            currentOpenButton: button,
            currentDialog: dialog
        });

        // Focus the dialog and remove aria attributes
        dialog.setAttribute('tabindex', 1);
        dialog.setAttribute('aria-hidden', false);

        // Bind events
        defer(bindKeyCodeEvents);
        defer(bindCloseEvents);
        if (!isModal && DOM.backdrop) {
            defer(bindBackdropEvents);
        }

        // Add backdrop if needed
        if (DOM.backdrop) {
            DOM.body.appendChild(DOM.backdrop);
        }

        // Grabs elements that are focusable inside this dialog instance.
        setState({
            focusableElements: qa(NATIVELY_FOCUSABLE_ELEMENTS.join(), dialog)
        });

        // Add class to make dialog visible. Needs to occur before focus.
        dialog.classList.add(activeClass);

        // Remove vertical viewport scroll
        DOM.root.classList.add(DEFAULT_CLASSNAMES.hasNoVerticalScroll);

        // Set focus to first element, fallback to Dialog.
        if (state.focusableElements.length) {
            state.focusableElements[0].focus();
        } else {
            dialog.focus();
        }
    }


    /**
     * @function bindCloseEvents
     * @desc Finds all close buttons and attaches click event listener
     * @param {node} dialog
     */
    function bindCloseEvents(dialog = state.currentDialog) {
        // Grab all buttons which open this instance of the dialog
        const closeButtons = qa(closeBtn);

        closeButtons.forEach(button => button.addEventListener('click', closeDialog));
    }


    /**
     * @function closeDialog
     * @desc Triggered by user interacting with a close button or in some cases clicking backdrop.
     * Adds aria attributes and hides dialog, removing backdrop if needed
     */
    function closeDialog() {

        const dialog = state.currentDialog;

        // Hide dialog for screenreaders and make untabbable
        dialog.setAttribute('aria-hidden', true);
        dialog.removeAttribute('tabindex');

        // Unbind events
        unbindKeyCodeEvents();
        if (!isModal && DOM.backdrop) {
            unbindBackdropEvents();
        }

        // Remove active state hook class
        dialog.classList.remove(activeClass);

        // Remove backdrop if needed
        if (DOM.backdrop) {
            DOM.body.removeChild(DOM.backdrop);
        }

        // Allow vertical viewport scroll
        DOM.root.classList.remove(DEFAULT_CLASSNAMES.hasNoVerticalScroll);

        // Return focus to button that opened the dialog
        state.currentOpenButton.focus();

        // Reset State
        setState({
            currentOpenButton: null,
            currentDialog: null
        });
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
     * @desc Checks to if Esc or Tab key have been pressed
     * @param {Event} e
     */
    function handleKeyPress(e) {
        if (e.keyCode === KEYCODES.escape && !isModal && !isAlert) {
            closeDialog(state.currentDialog);
        }

        if (e.keyCode === KEYCODES.tab && !isModal) {
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

        // Add body and html element to the DOM object
        setDOM({
            root: qa('html')[0],
            body: qa('body')[0]
        });

        if (showBackdrop) {
            createBackdrop();
        }

        DOM.dialogs.forEach(dialog => {

            // Add aria roles and attributes
            const role = isAlert ? 'alertdialog' : 'dialog';

            dialog.setAttribute('aria-hidden', 'true');
            dialog.setAttribute('role', role);

            // Set up event listeners for opening dialog
            bindOpenEvents(dialog);

            dialog.classList.add(readyClass);
        });
    }

    // Initialise VUIDialog component
    init();
};


export default VUIDialog;
