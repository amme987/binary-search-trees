import { Tree, prettyPrint } from './tree.js';

// let test = new Tree([1, 2, 3]);
let test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(test.root);
test.insert(60);
test.insert(80);
test.insert(2);

// test.insert(2);
// test.deleteItem(9);

// test.deleteItem(9);
// test.deleteItem(7);
// test.deleteItem(2);
// test.deleteItem(6345);

// test.deleteItem(67);
// prettyPrint(test.root);

// console.log(test.find(80));
// console.log(test.find(23));
// console.log(test.find(4));
// console.log(test.find(90));

// prettyPrint(test.root);
// console.log(test.inOrder(node => console.log(node.data)));

// console.log(test.levelOrder(node => node));

// console.log(test.preOrder(node => node));

// console.log(test.postOrder(node => node));

prettyPrint(test.root);

// console.log(test.find(67));

// console.log(test.height(test.root));
// console.log(test.height(test.find(67)));
// console.log(test.height(test.find(3)));
// console.log(test.height(test.find(18)));

// console.log(test.depth(test.root));
// console.log(test.depth(test.find(1)));

// console.log(test.inOrder(node => console.log(node.data)));

// console.log(test.isBalanced());

test.rebalance();
prettyPrint(test.root);
console.log(test.isBalanced());
