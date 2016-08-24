import VUIDialog from './components/dialog/';
import UITypeahead from './components/typeahead';

const dialog1 = VUIDialog();
const dialog2 = VUIDialog({
    dialog:         '.js-dialog-2',
    openBtn:        '.js-dialog-btn-open-2',
    closeBtn:       '.js-dialog-btn-close-2',
    isModal:        true,
    showBackdrop:   false
});


const typeahead1 = UITypeahead();


// Stop whining about unused variables
console.log(dialog1);
console.log(dialog2);
console.log(typeahead1);
