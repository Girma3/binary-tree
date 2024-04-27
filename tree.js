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
    *function that accept sorted array and return bst by 
    *finding the middle then make left and right subtree recursively
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
  //function that remove node by checking if the node is leaf node,has single child or have right and left children
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
  //function that accept node and value search if that value exist return node else return null
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
    //function that count left and right subtree of given node
    function treeHeight(node){
        if(node === null) return -1
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
    function height(node){
        return treeHeight(find(node));
    };
    //function that help to print levlorder accept array,level of tree and node
  function printLevel(node, level, result){
    if(node === null) return null
    if(level === 1){
        //console.log(node.data + '')
        result.push(node.data)
    }
    else if(level > 1){
        printLevel(node.left, level -1, result);
        printLevel(node.right, level - 1, result);
    }
   
  };
  //function that pront levelorder recursively
  function levelOrderRec(){
    const result = []
    let height = treeHeight(root);
    for(let i = 1; i < height + 2; i++){
       printLevel(root, i, result);
    }
    return result
  };
  //function that print levelorder using iterative method
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
    //function to traverse tree inorder return array accept optional callback
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
    //function that accepth optional callback and treverse in preorder return array
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
    //function traverse tree in post order,accept optional callback return array 
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
     //function return the depth of node
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
     return findDepth(root, node);
    };
    function isBalanced() {
        if (!this.root) return true;
        const leftHeight = treeHeight(this.root.left);
        const rightHeight = treeHeight(this.root.right);
        return Math.abs(leftHeight - rightHeight) <= 1;
    };
    function rebalance(){
        let traverse = inOrder();
        this.root =  buildTree(traverse);
    };
    return{
     root, prettyPrint, insert, deleteItem, find, levelOrder, 
         levelOrderRec, preOrder, inOrder , postOrder, depth ,
          height, isBalanced, rebalance
        }
}
export {Tree}