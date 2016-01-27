/**
 * @function UIModal
 * @version 0.0.1
 * @desc display a modal
 */

export default function UIModal(userOptions) {

    var DOM;
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
    * @desc Initialises the accordion
    */ 
    function init() {
        
        // Save all DOM queries for future use
        DOM = {
            'modal': document.querySelectorAll(settings.modal)[0],
            'openBtn': document.querySelectorAll(settings.openBtn)[0],
            'closeBtn': document.querySelectorAll(settings.closeBtn)[0],
            'overlay': document.querySelectorAll(settings.overlay)[0]
        };

        // Find modal and hide if not already hidden
        DOM.modal.classList.add('is-hidden');
        DOM.overlay.classList.add('is-hidden');
        
        // Attach event listeners to buttons
        DOM.openBtn.addEventListener('click', show, false);
        DOM.closeBtn.addEventListener('click', hide, false);
    }

    /**
     * @function show
     */
    function show() {
        console.log('show');
        DOM.modal.classList.remove('is-hidden');
        DOM.overlay.classList.remove('is-hidden');
    };


    /**
     * @function hide
     */
    function hide() {
        console.log('hide');
        DOM.modal.classList.add('is-hidden');
        DOM.overlay.classList.add('is-hidden');
    };

    ////////////

    // External API
    const module = {
        show: show,
        hide: hide
    };

    return module;
}
