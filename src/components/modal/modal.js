/**
 * @function UIModal
 * @version 0.0.1
 * @desc display a modal
 */

export default function UIModal(userOptions) {

    var DOM,
        state = {};
        
    const defaults = {
        modal: '.js-modal',
        openBtn: '.js-modal-btn',
        closeBtn: '.js-modal-close-btn',
        overlay: '.js-modal-overlay',
        showOverlay: true
    };

    // Combine defaults with passed in options
    const settings = Object.assign(defaults, userOptions);
    
    init();

    /**
    * @function init
    * @desc Initialises the modal
    */ 
    function init() {
        
        // Save all DOM queries for future use
        DOM = {
            'page': document.querySelectorAll('body')[0],
            'modal': document.querySelectorAll(settings.modal)[0],
            'openBtn': document.querySelectorAll(settings.openBtn)[0],
            'closeBtn': document.querySelectorAll(settings.closeBtn)[0],
            'overlay': document.querySelectorAll(settings.overlay)[0]
        };
        
        // Set page attribute
        DOM.page.setAttribute('data-ui-modal', 'is-initialised');

        // Find modal and hide if not already hidden
        DOM.modal.classList.add('is-hidden');
        DOM.overlay.classList.add('is-hidden');
        
        // Attach event listeners to buttons
        DOM.openBtn.addEventListener('click', show, false);
        DOM.closeBtn.addEventListener('click', hide, false);
        DOM.overlay.addEventListener('click', hide, false);
        document.addEventListener('keydown', keyHandler, false);

    }

    /**
     * @function show
     */
    function show() {
        state.isOpen = true;
        DOM.modal.classList.remove('is-hidden');
        DOM.overlay.classList.remove('is-hidden');
        DOM.page.setAttribute('data-current-modal', settings.modal);
    };

    /**
     * @function hide
     */
    function hide() {
        state.isOpen = false;
        DOM.modal.classList.add('is-hidden');
        DOM.overlay.classList.add('is-hidden');
        DOM.page.removeAttribute('data-current-modal');
    };
    
    /**
     * @function keyHandler
     * @desc Checks to see if escape (key 27) has been pressed
     * @param {Event} e
     */
    function keyHandler(e) {
        if ([27].indexOf(e.which) > -1 && state.isOpen === true) {
            e.preventDefault();
            hide();
        }
    }

    ////////////

    // External API
    const module = {
        show: show,
        hide: hide
    };

    return module;
}
