function mergeSort(array){
    if(array.length <= 1)return array
    let middle = Math.floor(array.length /  2);
    let leftSide = mergeSort(array.slice(0,middle));
    let rightSide = mergeSort(array.slice(middle));
    return merge(leftSide, rightSide)
}
/*
*function that acccept two array , compare them each element 
*using i and j as pointer then return sorted array
*
*/
function merge(array1, array2){
    //i and j use as pointer 
    let i = 0;
    let j = 0;
    let sortedArray = [];
    //the loop stop when we iterate all items
    while(i < array1.length && j < array2.length){
        //compare array1 and array2 item and push the smallest  item to sorted array and increment pointer
        if(array1[i] < array2[j]){
            sortedArray.push(array1[i]);
            i++;
        }
        else if(array1[i] > array2[j]){
            sortedArray.push(array2[j])
            j++;
        }
        //handle equal item
        else{
            sortedArray.push(array1[i]);
            sortedArray.push(array2[j]);
            i++;
            j++;
        }
    }
    //if there is remaining items on both array if one of them is larger than the other
    while(i < array1.length){
        sortedArray.push(array1[i]);
        i++;
    }
    while(j < array2.length){
        sortedArray.push(array2[j]);
        j++;
    }
    return sortedArray
}
export { mergeSort}




