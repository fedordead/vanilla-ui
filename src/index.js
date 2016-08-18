import UIDialog from './components/dialog/dialog';

const dialog1 = UIDialog();
const dialog2 = UIDialog({
    dialog:         '.js-dialog-2',
    openBtn:        '.js-dialog-btn-2',
    closeBtn:       '.js-dialog-close-btn-2',
    isModal:        true,
    showBackdrop:   false
});

// Stop whining about unused variables
console.log(dialog1);
console.log(dialog2);
