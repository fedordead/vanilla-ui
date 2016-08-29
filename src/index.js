import VUIDialog from './components/dialog/';
import UITypeahead from './components/typeahead';

VUIDialog();
VUIDialog({
    dialog: '.js-dialog-2',
    openBtn: '.js-dialog-btn-open-2',
    closeBtn: '.js-dialog-btn-close-2',
    isModal: true,
    showBackdrop: false
});


UITypeahead();
