import { Tree, prettyPrint } from './tree.js';

let test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(test.root);

console.log(test.isBalanced()); // true

console.log(test.levelOrder(() => {}));
console.log(test.inOrder(() => {}));
console.log(test.preOrder(() => {}));
console.log(test.postOrder(() => {}));

test.insert(60);
test.insert(80);
test.insert(2);
test.insert(2);

test.deleteItem(9);
test.deleteItem(6345);
test.deleteItem(4);

prettyPrint(test.root);

console.log(test.isBalanced()); // false

test.rebalance();

prettyPrint(test.root);

console.log(test.find(3));

console.log(test.isBalanced()); // true

console.log(test.levelOrder(() => {}));
console.log(test.inOrder(() => {}));
console.log(test.preOrder(() => {}));
console.log(test.postOrder(() => {}));

console.log(test.height(test.find(3))); // 2
console.log(test.depth(test.find(3))); // 1
