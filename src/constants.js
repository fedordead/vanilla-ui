// Keyboard keycodes
export const KEYCODES = Object.freeze({
    tab: 9,
    enter: 13,
    escape: 27,
    space: 32,
    leftArrow: 37,
    upArrow: 38,
    rightArrow: 39,
    downArrow: 40
});


// Classnames likely to be shared across modules
export const DEFAULT_CLASSNAMES = Object.freeze({
    isActive: 'is-active',
    isHidden: 'is-hidden',
    isReady: 'is-ready',
    hasNoVerticalScroll: 'has-no-vertical-scroll',
    noBackdrop: 'no-backdrop',
    backdrop: 'dialog-backdrop'
});


export const NATIVELY_FOCUSABLE_ELEMENTS = Object.freeze([
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
]);
