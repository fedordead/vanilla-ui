import chai from 'chai';
import keycodeIsAlphaNumeric from './keycodeIsAlphaNumeric';


const assert = chai.assert;

describe('keycodeIsAlphaNumeric', () => {

    it('should return "true" for numeric keycodes (0-9): > 47 && < 58  ', () => {
        assert.equal(keycodeIsAlphaNumeric(50), true);
    });

    it('should return "true" for upper alpha keycodes (A-Z): > 64 && < 91 ', () => {
        assert.equal(keycodeIsAlphaNumeric(80), true);
    });

    it('should return "true" for lower alpha keycodes (a-z): > 96 && < 123', () => {
        assert.equal(keycodeIsAlphaNumeric(100), true);
    });

    it('should return "false" for keycodes < 47', () => {
        assert.equal(keycodeIsAlphaNumeric(20), false);
    });

    it('should return "false" for keycodes > 123', () => {
        assert.equal(keycodeIsAlphaNumeric(124), false);
    });

    it('should return "false" for keycodes > 59 && < 64', () => {
        assert.equal(keycodeIsAlphaNumeric(61), false);
    });

});

