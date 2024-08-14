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
    let temp = Object.assign({}, this);
    Object.setPrototypeOf(temp, this);

    if (this.root === null) {
      return new Node(value);
    }

    if (value < this.root.data) {
      temp.root = this.root.left;
      this.root.left = temp.insert(value);
    } else if (value > this.root.data) {
      temp.root = this.root.right;
      this.root.right = temp.insert(value);
    }

    return this.root;
  }

  // Delete the given value
  deleteItem(value) {
    let temp = Object.assign({}, this);
    Object.setPrototypeOf(temp, this);

    if (this.root === null) {
      return this.root;
    }

    if (value === this.root.data) {
      // If node has 0 or 1 children, replace with child (null if 0 children)
      if (this.root.left === null) {
        return this.root.right;
      }
      if (this.root.right === null) {
        return this.root.left;
      }

      // When node has two children
      // Find in order successor
      let next = this.root.right;
      while (next.left) {
        next = next.left;
      }
      // Replace the node to be deleted with successor and delete successor duplicate
      this.root.data = next.data;
      temp.root = this.root.right;
      this.root.right = temp.deleteItem(next.data);
    }

    if (value < this.root.data) {
      temp.root = this.root.left;
      this.root.left = temp.deleteItem(value);
    } else if (value > this.root.data) {
      temp.root = this.root.right;
      this.root.right = temp.deleteItem(value);
    }

    return this.root;
  }

  // Returns the node with the given value
  find(value) {
    let temp = Object.assign({}, this);
    Object.setPrototypeOf(temp, this);

    if (this.root === null) {
      return null;
    }

    if (value < this.root.data) {
      temp.root = this.root.left;
      return temp.find(value);
    } else if (value > this.root.data) {
      temp.root = this.root.right;
      return temp.find(value);
    }

    return this.root;
  }

  // Tip: You will want to use an array acting as a queue to keep track of all the child nodes that you have yet
  // to traverse and to add new ones to the list
  levelOrder(callback) {
    if (!callback) {
      throw new Error('Callback needed');
    }

    let queue = [this.root];
    let result = [];

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);
      result.push(node.data);
      if (node.left !== null) {
        queue.push(node.left);
      }

      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    return result;
  }

  inOrder(callback, curr = this.root, queue = []) {
    if (!callback) {
      throw new Error('Callback needed');
    }
    if (curr) {
      callback(curr);

      this.inOrder(callback, curr.left, queue);
      queue.push(curr.data);
      this.inOrder(callback, curr.right, queue);
    }
    return queue;
  }
}

// Visualize the binary search tree
export const prettyPrint = (node, prefix = '', isLeft = true) => {
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
