import { Tree, prettyPrint } from './tree.js';

// let test = new Tree([1, 2, 3]);
let test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// prettyPrint(test.root);
// console.log(test);
test.insert(60);
test.insert(80);
test.insert(2);
// prettyPrint(test.root);
test.insert(2);
// prettyPrint(test.root);
test.deleteItem(9);

test.deleteItem(9);
test.deleteItem(7);
test.deleteItem(2);
test.deleteItem(6345);
// prettyPrint(test.root);

test.deleteItem(67);
// console.log(JSON.stringify(test));
// console.log(test.root.right);
// prettyPrint(test.root);
// test.deleteItem();
// console.log(test);
prettyPrint(test.root);

// console.log(test);

console.log(test.find(80));
console.log(test.find(23));
console.log(test.find(4));
console.log(test.find(90));
// console.log(test.find(9));
prettyPrint(test.root);
console.log(test.inOrder(node => console.log(node.data)));
// prettyPrint(test.root);
// console.log(test);
// console.log(test);z
// console.log(JSON.stringify(test));
// console.log(test.find(23));
