/**
 * @function UIDialog
 * @version 0.0.2
 */

import {keyCodes, defaultClassNames} from '../../constants';


const UIDialog = ({
        dialog = '.js-dialog',
        openBtn = '.js-dialog-btn',
        closeBtn = '.js-dialog-close-btn',
        isModal = false,
        showBackdrop = true
    } = {}) => {

    let DOM,
        state = {};

    // Create the backdrop
    const backdrop = document.createElement('div');

    backdrop.classList.add(defaultClassNames.DIALOG_BACKDROP);

    init();

    /**
     * @function init
     * @desc Initialises the dialog
     */
    function init() {

        // Save all DOM queries for future use
        DOM = {
            'page':     document.querySelectorAll('body')[0],
            'dialog':   document.querySelectorAll(dialog)[0],
            'openBtn':  document.querySelectorAll(openBtn)[0],
            'closeBtn': document.querySelectorAll(closeBtn)[0]
        };

        // Check if the dialog exists, return if not
        if (DOM.dialog === undefined) {
            return false;
        }

        // Remove backdrop if turned off
        if (!showBackdrop) {
            DOM.dialog.classList.add(defaultClassNames.NO_BACKDROP);
        }

        // Set page attribute
        DOM.page.setAttribute('data-ui-dialog', 'is-initialised');

        // Find dialog and hide if not already hidden
        DOM.dialog.classList.add(defaultClassNames.IS_HIDDEN);

        // Attach event listeners
        DOM.openBtn.addEventListener('click', show, false);
        DOM.closeBtn.addEventListener('click', hide, false);
        if (!isModal) {
            backdrop.addEventListener('click', hide, false);
        }
        document.addEventListener('keydown', keyHandler, false);
    }

    /**
     * @function show
     */
    function show() {
        state.isOpen = true;
        DOM.dialog.classList.remove(defaultClassNames.IS_HIDDEN);
        DOM.page.setAttribute('data-current-dialog', dialog);
        // Add the backdrop to the page
        DOM.page.appendChild(backdrop);
    };

    /**
     * @function hide
     */
    function hide() {
        state.isOpen = false;
        DOM.dialog.classList.add(defaultClassNames.IS_HIDDEN);
        DOM.page.removeAttribute('data-current-dialog');
        // Remove the backdrop from the page
        DOM.page.removeChild(backdrop);
    };

    /**
     * @function keyHandler
     * @desc Checks to see if escape (key 27) has been pressed and dialog not modal
     * @param {Event} e
     */
    function keyHandler(e) {
        if ([keyCodes.ESCAPE].indexOf(e.which) > -1 && state.isOpen === true && !isModal) {
            e.preventDefault();
            hide();
        }
    }

    // External API
    return {
        show,
        hide
    };
};

export default UIDialog;
