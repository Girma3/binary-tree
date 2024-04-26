import { mergeSort } from "./utility.js";
function Node(data){
    let left = null
    let right = null
    return {
        data, left , right
    }
}
function Tree(array){
    if(array === null) return
    let root = buildTree(array);
   function buildTree(array){
    let removeDuplicate = [...new Set(array)];
    let sortedArray = mergeSort(removeDuplicate);
      
    /*
    *function that accept sorted array and return bts tree by 
    *find the middle then make left and right subtree recursively
    */
    let arrayToBts = function(array, start, end){
        //base case
        if(start > end) return null
        let middle = Math.floor((start + end) / 2);
        //make the middle elemnt root
        let node = Node(array[middle]);
        //recursively build left side subtree from left side array
        node.left = arrayToBts(array, start , middle - 1);
         //recursively build right side subtree from right side array
        node.right = arrayToBts(array, middle + 1 , end);
        return node
    };
    return arrayToBts(sortedArray, 0, sortedArray.length - 1)
   };
   const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  /**
   * function that check root and new node 
   * if root greater than newnode go to left side of root else go right side
   * recursively till we found null value and set it to newnode
   * @param  node 
   * @param  newNode 
   * 
   */
  const insertValue = function(node , newNode){
    if(node.data > newNode.data){
        if(node.left === null){
            node.left = newNode;
        }
        else{
            insertValue(node.left, newNode);
        }
    }
    else{
        if(node.right === null){
            node.right = newNode;
        }
        else{
            insertValue(node.right, newNode)
        }
    }
  }
  function insert(value){
    let newNode = Node(value);
    
    if(root === null){
        root = newNode;
    }
    else{
        insertValue(root, newNode);
    }
    
  };
  const removeNode = function(node, value){
    //base case
    if(node === null) return null
    if(node.data > value){
        node.left = removeNode(node.left, value);
        return node
    }
    else if(node.data < value){
        node.right = removeNode(node.right, value);
        return node
    }
    //we found node
    else{
        //case 1 if node is leaf node has no children make it null
        if(node.left === null && node.right === null){
            node = null;
            return node
        }
        //case 2 if node has either has left or right child
        if(node.left === null){
            node = node.right;
            return node;
        }
        else if(node.right === null){
            node = node.left;
            return node
        }
        //function that get minimum node on the left side of given node
        const findMinNode = function(node){
            while(node.left !== null){
                node = node.left;
            }
            return node
        }
        //case 3 a node with children on left and right
        let succesor = findMinNode(node.right);
        node.data = succesor.data;
        //remove duplicate
        node.right = removeNode(node.right, succesor.data);
        return node
    }
  };
  function deleteItem(value){
    root = removeNode(root, value)
  };
  //function that accept node and value search if that value exist return node else return false
  function findNode(node, value){
    if(node === null) return null
    if(node.data > value){
        return findNode(node.left, value);
    }
    else if(node.data < value){
        return findNode(node.right, value);
    }
    //we found the node
    
    else{
       return node
    }
  };
  function find(value){
    return findNode(root, value)
  };
  function treeHeight(node){
   if(node === null) return 0
   else{
    let leftHeight = treeHeight(node.left);
    let righHeight = treeHeight(node.right);
    if(leftHeight > righHeight){
        return (leftHeight + 1)
    }
    else{
        return (righHeight + 1)
    }
   }

  };
  function printLevel(node, level){
    if(node === null) return null
    if(level === 1){
        console.log(node.data + '')
    }
    else if(level > 1){
        printLevel(node.left, level -1);
        printLevel(node.right, level - 1);
    }
  };
  function levelOrderRec(){
    let height = treeHeight(root);
    for(let i = 1; i < height; i++){
        printLevel(root, i)
    }
  }
  function levelOrder(callback){
    if(root === null) return
      let queue = [];
       queue.push(root)
      let result = [];
     while(queue.length !== 0){
        let current = queue.shift();
        if(current.left){
            queue.push(current.left);
        }
        if(current.right){
            queue.push(current.right);
        }
        if(callback){
            callback(current.data)
         }
        else{
          result.push(current.data);
        }
      }
     return result
    };
    function inOrderTraverse(node, callback){
        let result = []
        if(node !== null){
           
            
            result.push(...inOrderTraverse(node.left, callback))
            result.push(node.data)
            if(callback){
                callback(node.data)
            }
            result.push(...inOrderTraverse(node.right, callback))
        }
        return result
    };
    function preOrderTraverse(node, callback){
        let result = []
        if(node !== null){
            if(callback){
                callback(node.data)
            }
            result.push(node.data)
            result.push(...preOrderTraverse(node.left, callback))
            result.push(...preOrderTraverse(node.right, callback))
        }
        return result
    };
    function postOrderTraverse(node, callback){
        let result = []
        if(node !== null){
            result.push(...postOrderTraverse(node.left, callback))
            result.push(...postOrderTraverse(node.right, callback))
            result.push(node.data)
            if(callback){
                callback(node.data)
            }
        }
        return result
    };
    function inOrder(callback){
        return inOrderTraverse(root, callback)
    }
    function preOrder(callback){
        return preOrderTraverse(root, callback)
     };
     function postOrder(callback){
        return postOrderTraverse(root, callback)
     };
     function findDepth(node, value){
        if (node === null) return -1;
        if(node.data === value)return 0
        // Recursively search in left and right subtrees
        const leftDepth = findDepth(node.left, value);
        const rightDepth = findDepth(node.right, value);
        // If x is found in either subtree, return the maximum depth + 1
        if (leftDepth >= 0 || rightDepth >= 0) {
            return Math.max(leftDepth, rightDepth) + 1;
        }
        // If x is not found in either subtree, return -1
        return -1;
     };
    function depth(node){
     return findDepth(root, node)
    };
    function findHeight(node, value){
        if (node === null) {
            return 0; // Node not found
        }
    
        if (node.data === value) {
            return 1; // Height of the found node
        }
        const leftHeight = findHeight(node.left, value);
        const rightHeight = findHeight(node.right, value);
        if (leftHeight !== 0) {
            return leftHeight + 1;
        } else if (rightHeight !== 0) {
            return rightHeight + 1;
        } else {
            return 0
        }
    };
    function height(node){
        return findHeight(root, node)
    };
    function getHeight(node) {
        if (!node) return 0;
    
        const leftHeight = getHeight(node.left);
        const rightHeight = getHeight(node.right);
    
        return Math.max(leftHeight, rightHeight) + 1;
    };
    function isBalanced(node) {
        if (!node) return true;
        const leftHeight = treeHeight(node.left);
        const rightHeight = treeHeight(node.right);
        return Math.abs(leftHeight - rightHeight) <= 1;
    }
    function balance(){
        
        };
    function rebalance(){
        let traverse = inOrder();
        console.log(traverse)
        this.root =  buildTree(traverse);
    }
    
    return{
        root: root, prettyPrint, insert, deleteItem, find, levelOrder, treeHeight,
         levelOrderRec, preOrder, inOrder , postOrder, depth , height, getHeight, isBalanced, rebalance

    }
}
let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9,]
let bts = Tree(arr)
//console.log(bts.root)
function p (a){
    console.log(a)
}
//bts.insert(6)
//console.log(bts.find(14))
bts.prettyPrint(bts.root)
console.log(bts.treeHeight(bts.find(23)))

//console.log(bts.levelOrder())
//bts.levelOrderRec()
//console.log( bts.preOrder())
//console.log( bts.inOrder())
//console.log( bts.postOrder())
//console.log(bts.depth(3))
console.log(bts.height(1))
console.log(bts.getHeight(23))
console.log(bts.isBalanced(bts.root))
bts.insert(100)
bts.insert(120)
bts.insert(130)
bts.insert(140)
console.log(bts.isBalanced(bts.root))
bts.rebalance()
console.log(bts.isBalanced(bts.root))
console.log(bts.root)
bts.prettyPrint(bts.root)

//console.log(bts.root)
//console.log(bts.treeHeight(bts.root))