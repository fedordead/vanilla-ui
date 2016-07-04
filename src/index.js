import UIDialog from './components/dialog/dialog';

let dialog1 = UIDialog();
let dialog2 = UIDialog({
    dialog:         '.js-dialog-2',
    openBtn:        '.js-dialog-btn-2',
    closeBtn:       '.js-dialog-close-btn-2',
    isModal:        true,
    showBackdrop:   false
});

// Stop whining about unused variables
console.log(dialog1);
console.log(dialog2);
