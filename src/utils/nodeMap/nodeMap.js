/**
 * @function nodeMap
 * @desc converts nodelist to array and maps over it
 * @param {nodeList} [nodeList] list of dom nodes
 * @param {function} func function to perform on each node
 * @return {array} - array of edited nodes
 */
const nodeMap = (nodeList, func) => [].slice.call(nodeList).map(node => func(node));

export default nodeMap;
