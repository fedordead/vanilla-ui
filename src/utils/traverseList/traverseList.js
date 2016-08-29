import {keyCodes, defaultClassNames} from '../../constants';

/**
 * @function traverseList
 * @desc Moves up and down through a list of nodes, wrapping around at the first and last
 * element.
 * @param {number} keyCode - the key pressed.
 * @param {nodeList} nodeList - the list of options to traverse.
 * @param {node} currentSelected - the option currently selected.
 */
const traverseList = (keyCode, nodeList, currentSelected) => {

    if (currentSelected) {
        currentSelected.classList.remove(defaultClassNames.IS_SELECTED);
    }

    let newSelected;

    // If up key and first or no element selected, select last element
    if (keyCode === keyCodes.UP_ARROW &&
       (!currentSelected || !currentSelected.previousSibling)) {

        newSelected = nodeList[nodeList.length - 1];

    // If down key and last or no element selected, select first element
    } else if (keyCode === keyCodes.DOWN_ARROW &&
              (!currentSelected || !currentSelected.nextSibling)) {

        newSelected = nodeList[0];

    // If up key select sibling prev
    } else if (keyCode === keyCodes.UP_ARROW) {
        newSelected = currentSelected.previousSibling;

    // Fall back to Down key, selects item below
    } else {
        newSelected = currentSelected.nextSibling;
    }

    newSelected.classList.add(defaultClassNames.IS_SELECTED);
    currentSelected = newSelected;

    return newSelected;
};


export default traverseList;
