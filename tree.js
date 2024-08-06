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

    if (this.root === null) {
      return new Node(value);
    }
    if (value < this.root.data) {
      test.root = this.root.left;
      this.root.left = test.insert(value);
    } else if (value > this.root.data) {
      test.root = this.root.right;
      this.root.right = test.insert(value);
    }

    return this.root;
  }

  // Delete the given value
  deleteItem(value) {
    let test = Object.assign({}, this);
    Object.setPrototypeOf(test, this);

    // If value is at root of Tree, delete  // Later modify to replace instead of delete
    if (value === this.root.data) {
      this.root = null;
    } else if (value < this.root.data) {
      let left = this.root.left;
      // If value is at left node, set left node to null
      if (value === left.data) {
        this.root.left = null;
      } else {
        test.root = left;
        test.deleteItem(value);
      }
    } else if (value > this.root.data) {
      let right = this.root.right;
      // If value is at right node, set right node to null
      if (value === right.data) {
        this.root.right = null;
      } else {
        test.root = right;
        test.deleteItem(value);
      }
    }
  }

  // Returns the node with the given value
  find(value) {
    console.log(this);
    let test = Object.assign({}, this);
    Object.setPrototypeOf(test, this);

    if (value === test.root.data) {
      console.log(value);
      console.log(test.root);
      return test.root;
    }
    if (value < test.root.data) {
      test.root = test.root.left;
      test.find(value);
    } else if (value > test.root.data) {
      test.root = test.root.right;
      test.find(value);
    }
  }

  levelOrder(callback) {}
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
// prettyPrint(test.root);
test.insert(2);
prettyPrint(test.root);
// test.deleteItem(9);
// prettyPrint(test.root);
// console.log(test);

// console.log(test.find(23));
// console.log(test);
// // console.log(JSON.stringify(test));
// console.log(test.find(23));
