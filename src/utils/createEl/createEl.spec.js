import chai from 'chai';
import spies from 'chai-spies';
import jsdom from 'mocha-jsdom';
import createEl from './createEl';


const expect = chai.expect;

describe('createEl()', function () {

    jsdom()
    chai.use(spies);

    it('should create a "div" when no params passed', () => {
        const div = createEl();
        expect(div.nodeName).eql('DIV')
    });

    it('should create a "<section>" when element "section" passed in', () => {
        const div = createEl({element: 'section'});
        expect(div.nodeName).eql('SECTION')
    });

    it('should correctly render an element with a class', () => {
        const div = createEl({className: 'c-component'});
        expect(div.className).eql('c-component')
    });

    it('should correctly render and element with multiple classes from array', () => {
        const div = createEl({className: ['c-component', 'c-component--modified']});
        expect(div.className).eql('c-component c-component--modified')
    });

    it('should create a text node if text prop provided', () => {
        const button = createEl({text: 'Click me'});
        expect(button.innerHTML).eql('Click me')
    });

    it('should add role attribute', () => {
        const div = createEl({role: 'dialog'});
        expect(div.getAttribute('role')).eql('dialog')
    });

    it('should add type attribute', () => {
        const input = createEl({type: 'radio'});
        expect(input.getAttribute('type')).eql('radio')
    });

    it('should create a child node', () => {
        const div = createEl({children: [{element: 'button'}]});
        const child = div.firstElementChild;
        expect(child.nodeName).eql('BUTTON')
    });

    it('should add an onclick event', () => {
        const spy = chai.spy();
        const button = createEl({onClick: spy});
        button.click();
        expect(spy).to.have.been.called();
    });

});
