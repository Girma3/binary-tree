import { Tree } from "./tree.js";
function arrayRandom(size){
    let result = [];
    for(let i = 0; i < size; i++){
        let randomNum = Math.floor(Math.random() * 100);
        result.push(randomNum);
    }
    return result
};
let array = arrayRandom(15);
let bst = Tree(array);
console.log(bst.isBalanced()) //output true
bst.insert(100);
bst.insert(110);
bst.insert(120);
bst.insert(130);
console.log(bst.isBalanced()) //outpt false
bst.rebalance();
console.log(bst.isBalanced()) //output true
console.log(bst.levelOrder());
console.log(bst.preOrder());
console.log(bst.inOrder());
console.log(bst.postOrder());
console.log(bst.root)
bst.prettyPrint(bst.root);