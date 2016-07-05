/**
 * Dialog component, see README.md for full details.
 * @return {Object} - External API.
 */
export default function VanillaUIDialogComponent(userOptions) {

    /**
     * Set the component's default SETTINGS.
     * @param {Object} DEFAULTS.
     * @param {string} [DEFAULTS.target] - Set the JS hook for the dialog itself.
     * @param {string} [DEFAULTS.trigger] - Set the JS hook for the button that opens the dialog.
     * @param {string} [DEFAULTS.closeBtn] - Set the JS hook for the button that closes the dialog.
     * @param {boolean} [DEFAULTS.isModal] - Determines if the dialog will be of type "Modal".
     * @param {boolean} [DEFAULTS.showBackdrop] - Determines if the dialog will have a BACKDROP.
     */
    const DEFAULTS = {
        target: '.js-dialog-target',
        trigger: '.js-dialog-trigger',
        closeBtn: '.js-dialog-close-btn',
        isModal: false,
        showBackdrop: true
    };

    // Combine DEFAULTS with passed in options
    const SETTINGS = Object.assign(DEFAULTS, userOptions);

    // Create the backdrop, the backdrop dims inaccessible content whilst a dialog is active
    const BACKDROP = document.createElement('div');

    BACKDROP.classList.add('dialog-backdrop');

    let DOM,
        state = {};

    /**
     * Initialise the dialog component.
     */
    function init() {

        // Save all DOM queries for easy access
        DOM = {
            'page': document.querySelectorAll('body')[0],
            'target': document.querySelectorAll(SETTINGS.target)[0],
            'trigger': document.querySelectorAll(SETTINGS.trigger)[0],
            'closeBtn': document.querySelectorAll(SETTINGS.closeBtn)[0]
        };

        // Check if the dialog exists, return if not
        if (DOM.target === undefined) {
            return false;
        }

        // Remove backdrop if turned off
        if (!SETTINGS.showBackdrop) {
            DOM.target.classList.add('no-backdrop');
        }

        // Set data attribute to the `<body>` element
        DOM.page.setAttribute('data-ui-dialog', 'is-initialised');

        // Find dialog and hide if not already hidden
        DOM.target.classList.add('is-hidden');

        // Attach event listeners
        DOM.trigger.addEventListener('click', show, false);
        DOM.closeBtn.addEventListener('click', hide, false);
        if (!SETTINGS.isModal) {
            BACKDROP.addEventListener('click', hide, false);
        }
        document.addEventListener('keydown', keyHandler, false);
        document.addEventListener('keydown', trapFocus, false);
    }

    init();

    /**
     * Show the dialog including injecting the backdrop into the document.
     */
    function show() {
        state.isOpen = true;
        DOM.target.classList.remove('is-hidden');
        DOM.target.setAttribute('tabindex', -1);
        DOM.page.setAttribute('data-current-dialog', SETTINGS.target);
        DOM.page.appendChild(BACKDROP);
    };

    /**
     * Hide the dialog including removing the backdrop from the document.
     */
    function hide() {
        state.isOpen = false;
        DOM.target.classList.add('is-hidden');
        DOM.target.removeAttribute('tabindex');
        DOM.page.removeAttribute('data-current-dialog');
        DOM.page.removeChild(BACKDROP);
    };

    /**
     * Checks to see if escape (key 27) has been pressed and that the dialog is not of type
     * "Modal".
     * @param {Event} e
     */
    function keyHandler(e) {
        if ([27].indexOf(e.which) > -1 && state.isOpen === true && !SETTINGS.isModal) {
            e.preventDefault();
            hide();
        }
    }

    function trapFocus(e) {
        const NATIVELY_FOCUSABLE_ELEMENTS = [
            'a[href]',
            'area[href]',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            'button:not([disabled])',
            'iframe',
            'object',
            'embed',
            '[contenteditable]',
            '[tabindex]:not([tabindex^="-"])'
        ];

        // Get the index of the current active element within the dialog
        let focusedIndex = NATIVELY_FOCUSABLE_ELEMENTS.indexOf(document.activeElement);

        // if ([9].indexOf(e.which) > -1 && state.isOpen === true) {
        //     e.preventDefault();
        //     return console.log(focusedIndex);
        // }
        return console.log(focusedIndex);
    }

    /**
     * External API.
     * @type {Object}
     */
    const module = {
        show: show,
        hide: hide
    };

    return module;
}
