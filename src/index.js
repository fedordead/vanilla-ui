import UIDialog from './components/dialog';
import UITypeahead from './components/typeahead';

const dialog1 = UIDialog();
const dialog2 = UIDialog({
    dialog:         '.js-dialog-2',
    openBtn:        '.js-dialog-btn-2',
    closeBtn:       '.js-dialog-close-btn-2',
    isModal:        true,
    showBackdrop:   false
});


const typeahead1 = UITypeahead();


// Stop whining about unused variables
console.log(dialog1);
console.log(dialog2);
console.log(typeahead1);
