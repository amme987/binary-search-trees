import { Node } from './node.js';

export class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  // Write a buildTree(array) function that takes an array of data(e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
  // and turns it into a balanced binary tree full of Node objects appropriately placed(don’t forget to sort and remove duplicates!).
  // The buildTree function should return the level - 0 root node.
  buildTree(array) {
    if (array.length === 0) {
      return null;
    }

    // Remove duplicates and sort the array
    array = array.filter((value, index) => array.indexOf(value) === index);
    array.sort((a, b) => a - b);

    let middle = Math.trunc(array.length / 2);
    let root = new Node(array[middle]);
    root.left = this.buildTree(array.slice(0, middle));
    root.right = this.buildTree(array.slice(middle + 1, array.length));

    return root;
  }

  // Insert the given value
  insert(value) {
    let test = Object.assign({}, this);
    Object.setPrototypeOf(test, this);

    if (value === this.root.data); // If value is already in tree, return
    if (value < this.root.data) {
      if (!this.root.left) {
        this.root.left = new Node(value);
      } else {
        test.root = this.root.left;
        test.insert(value);
      }
    } else if (value > this.root.data) {
      if (!this.root.right) {
        this.root.right = new Node(value);
      } else {
        test.root = this.root.right;
        test.insert(value);
      }
    }
  }

  // Delete the given value
  deleteItem(value) {}
}

// Visualize the binary search tree
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

// let test = new Tree([1, 2, 3]);
let test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(test.root);
// console.log(test);
test.insert(60);
test.insert(80);
test.insert(2);
// console.log(JSON.stringify(test));
prettyPrint(test.root);
test.insert(2);
prettyPrint(test.root);
