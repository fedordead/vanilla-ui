// Keyboard keycodes
export const keyCodes = {
    ESCAPE: 27,
    ENTER: 13,
    SPACE: 32,
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40
};


// Classnames likely to be shared across modules
export const defaultClassNames = {
    IS_ACTIVE: 'is-active',
    IS_HIDDEN: 'is-hidden',
    IS_READY: 'is-ready',
    NO_BACKDROP: 'no-backdrop',
    DIALOG_BACKDROP: 'dialog-backdrop'
};


export const NATIVELY_FOCUSABLE_ELEMENTS = [
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
