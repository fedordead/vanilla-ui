
import UIModal from 'components/modal/modal';

let modal1 = UIModal();
let modal2 = UIModal({
    modal: '.js-modal-2',
    openBtn: '.js-modal-btn-2',
    closeBtn: '.js-modal-close-btn-2'   
});

// Stop whining about unused variables
console.log(modal1);
console.log(modal2);
