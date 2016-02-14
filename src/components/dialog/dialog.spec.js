import chai from 'chai';
import UIDialog from '../src/components/dialog/dialog';

chai.expect();

const expect = chai.expect;

var document;

describe('UIDialog', function () {
    
    before(function () {
        document = {};
        dialog = new UIDialog();
    })
    
    describe('upon activation', function () {
        it('should return false if no DOM element exists', () => {
            // expect(lib.name).to.be.equal('Library');
        });
    });
});
