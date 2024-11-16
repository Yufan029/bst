import Tree from "./Tree.js";

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

tree.prettyPrint(tree.root);
tree.insert(23);
tree.insert(20);
tree.insertIterative(80);
tree.prettyPrint(tree.root);
console.log(tree.find(65));
