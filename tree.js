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
  insert(value, temp = this.root) {
    if (!temp) {
      return new Node(value);
    }

    if (value < temp.data) {
      temp.left = this.insert(value, temp.left);
    } else if (value > temp.data) {
      temp.right = this.insert(value, temp.right);
    }

    return temp;
  }

  // Delete the given value
  deleteItem(value, temp = this.root) {
    if (!temp) {
      return temp;
    }

    if (value === temp.data) {
      // If node has 0 or 1 children, replace with child (null if 0 children)
      if (temp.left === null) {
        return temp.right;
      }
      if (temp.right === null) {
        return temp.left;
      }

      // When node has two children
      // Find in order successor
      let next = temp.right;
      while (next.left) {
        next = next.left;
      }
      // Replace the node to be deleted with successor and delete successor duplicate
      temp.data = next.data;
      temp.right = this.deleteItem(next.data, temp.right);
    }

    if (value < temp.data) {
      temp.left = this.deleteItem(value, temp.left);
    } else if (value > temp.data) {
      temp.right = this.deleteItem(value, temp.right);
    }

    return temp;
  }

  // Returns the node with the given value
  find(value, temp = this.root) {
    if (!temp) {
      return null;
    }

    if (value < temp.data) {
      return this.find(value, temp.left);
    } else if (value > temp.data) {
      return this.find(value, temp.right);
    }

    return temp;
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

  // left -> root -> right
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

  // root -> left -> right
  preOrder(callback, curr = this.root, queue = []) {
    if (!callback) {
      throw new Error('Callback needed');
    }
    if (curr) {
      callback(curr);

      queue.push(curr.data);
      this.preOrder(callback, curr.left, queue);
      this.preOrder(callback, curr.right, queue);
    }
    return queue;
  }

  // left -> right -> root
  postOrder(callback, curr = this.root, queue = []) {
    if (!callback) {
      throw new Error('Callback needed');
    }
    if (curr) {
      callback(curr);

      this.postOrder(callback, curr.left, queue);
      this.postOrder(callback, curr.right, queue);
      queue.push(curr.data);
    }
    return queue;
  }

  // Returns the given node's height. Height is defined as the number of edges in the longest path from a given node to a leaf node.
  height(node) {
    if (!node) {
      return -1;
    }

    let left = this.height(node.left);
    let right = this.height(node.right);

    if (left > right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }

  // Returns the given node’s depth. Depth is defined as the number of edges in the path from a given node to the tree’s root node.
  depth(node, temp = this.root) {
    if (!node) {
      return -1;
    }

    if (temp === node) {
      return 0;
    }

    if (node.data < temp.data) {
      return this.depth(node, temp.left) + 1;
    } else {
      return this.depth(node, temp.right) + 1;
    }
  }

  // Function that checks if the tree is balanced. A balanced tree is one where the difference
  // between heights of the left subtree and the right subtree of every node is not more than 1.
  isBalanced(node = this.root) {
    // If tree is empty, return true
    if (!node) {
      return true;
    }

    let left = this.height(node.left);
    let right = this.height(node.right);

    if (
      Math.abs(left - right) <= 1 &&
      this.isBalanced(node.left) === true &&
      this.isBalanced(node.right) === true
    ) {
      return true;
    }

    return false;
  }

  // Function that rebalances an unbalanced tree. Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.
  rebalance() {
    this.root = this.buildTree(this.inOrder(() => {}));
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
