import Dialog from './components/dialog/dialog';

let dialog1 = Dialog();

let dialog2 = Dialog({
    target: '.js-dialog-target-2',
    trigger: '.js-dialog-trigger-2',
    closeBtn: '.js-dialog-close-btn-2',
    isModal: true
});

let dialog3 = Dialog({
    target: '.js-dialog-target-3',
    trigger: '.js-dialog-trigger-3',
    closeBtn: '.js-dialog-close-btn-3',
    showBackdrop: false
});
