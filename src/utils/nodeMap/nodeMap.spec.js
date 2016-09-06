import chai from 'chai';
import spies from 'chai-spies';
import jsdom from 'mocha-jsdom';
import nodeMap from './nodeMap';


const expect = chai.expect;

describe('nodeMap()', () => {

    jsdom();
    chai.use(spies);

    it('should create a an array from a nodelist', () => {
        // Set up nodeList.  JSdom doesn't work if this is in `describe` section
        const createListItem = () => document.createElement('li');

        let rootNode = document.createElement('ul');
        let docFrag = document.createDocumentFragment();

        for (let i = 0; i < 4; i++) {
            const listItem = createListItem();
            docFrag.appendChild(listItem);
        }

        rootNode.appendChild(docFrag);

        // The test
        const spy = chai.spy();
        const array = nodeMap(rootNode, spy);
        expect(array).to.be.instanceof(Array);

    });

});
