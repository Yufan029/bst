import Node from "./Node.js";

export default class Tree {
  constructor(array) {
    const uniqueArray = [...new Set(array)];
    const sortedUniqueArray = uniqueArray.sort((x, y) => x - y);
    this.root = this.#buildTree(
      sortedUniqueArray,
      0,
      sortedUniqueArray.length - 1
    );
  }

  #buildTree(array, start, end) {
    if (start > end) {
      return null;
    }

    let mid = Math.floor((start + end) / 2);
    let root = new Node(array[mid]);

    root.left = this.#buildTree(array, start, mid - 1);
    root.right = this.#buildTree(array, mid + 1, end);

    return root;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }

    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);

    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value) {
    if (this.find(value)) {
      console.log(`Value: ${value} already exist, no need to insert anymore.`);
      return;
    }

    this.#insertTree(this.root, value);
  }

  #insertTree(root, value) {
    if (root === null) {
      return new Node(value);
    }

    if (root.value > value) {
      root.left = this.#insertTree(root.left, value);
    } else {
      root.rigth = this.#insertTree(root.right, value);
    }

    return root;
  }

  insertIterative(value) {
    if (this.root === null) {
      return;
    }

    let cur = this.root;
    let parent = cur;

    while (cur !== null) {
      parent = cur;
      if (value === cur.value) {
        console.log(
          `Value: ${value} already exist, no need to insert anymore.`
        );
        return;
      } else if (value < cur.value) {
        cur = cur.left;
      } else {
        cur = cur.right;
      }
    }

    let node = new Node(value);
    if (value < parent.value) {
      parent.left = node;
    } else {
      parent.right = node;
    }
  }

  find(value) {
    return this.#findValue(this.root, value);
  }

  #findValue(root, value) {
    if (root === null) {
      return false;
    }

    if (root.value === value) {
      return true;
    }

    if (value < root.value) {
      return this.#findValue(root.left, value);
    }

    return this.#findValue(root.right, value);
  }
}
