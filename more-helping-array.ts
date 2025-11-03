/**Paayas Akotkar formulas
 * @copyright @2024
 */
// to use tags on the rest of the methods
// tags: /**@param... */

/* required enum*/
enum Acoordon {
    Aindexes, /**get all the indexes of the duplicate number*/
    Findex, /**get first index of the total number of duplicate number */
    Foccurence, /**get first occurence of the duplicate number*/
    Aoccurence, /**get all the duplicate number*/
}
// end of enum

/**
 * removes the duplicate value from an array
 * note: it is recommend to use a variable to get the values
 * becuase its not cpp void which manipulates the passed param
 * @param DupValArray: a range that contains duplicate value
 * @returns removes the total number of dupicate array from the range 
*/
function RemoveDuplicateVal(DupValArray: number[] | any[]): number[] {
    DupValArray.sort((a, b) => a - b) // important

    // removing duplicate val 

    DupValArray = DupValArray.filter((e, i) => (e != DupValArray[i - 1]))

    // another way of removing duplicate val:
    // DupValArray = DupValArray.filter((e, i) => {
    //     while (e != DupValArray[i - 1]) {
    //         return DupValArray
    //     }
    // })

    return [...DupValArray]
}
// end of RemoveDuplicateVal method

/**  
 *  note: it is recommend to use a variable to see the change
 * @param ar: an integeral range
 * @param valueToRemove : value to remove from the range
 * @returns removes the element from the range
 * 
*/
function erase(ar: number[] | any[], valueToRemove: number | any) {
    ar.sort((a, b) => a - b) // important
    // removing duplicate val 
    ar = ar.filter((e, i) => (valueToRemove != ar[i]))
    return [...ar]
}
// end of RemoveValue method

/**  HHArray= Helping Hand Array
 * a class that provides a shorthand for getting duplicate value and their value index either all or first or last occurence
 * note current it is only preferable to work with created methods here 
 * 
*/
class HHArray {
    /**note: the fields are filled with the created methods in this module*/
    firstDupNumber: number | any = 0
    LastDupNumber: number | any = 0
    DupNumbers: number[] | any = [] /**  list of duplicate numbers // note not like 2,2,3,.. */
    ADupNumbers: number[] | any = [] // list of all the duplicate numbers // like 2,2,3,3... */
    ADupNumbersindex: number[] | any = [] // list of all the duplicate numbers indexes // like [2, 2,3,3] then output 0, 1, 2, 3 */
    RefArray: number[] = []  /**  passed array through constructor */
    /**note that this will require you to pass an array to compare with and an enum Acoordon */
    FoundIndexes: number[] = [] /**  either matched indexes or matched indexes values  on desired enum Acoordon in the RefArray*/
    // end of fields 

    /**  actually it is lazy work 
     * it is recommend to use  the methods if got confuse
    */
    constructor(ArrayParam: number[], /**this is the parent array that will fills the given field */
        CompareParam: number[], /**to compare array with the array param*/
        a: Acoordon
    ) {
        this.RefArray = ArrayParam
        this.firstDupNumber = FDuplicate(this.RefArray, false, true)
        this.LastDupNumber = FDuplicate(this.RefArray, false, false, true)
        this.DupNumbers = FDuplicate(this.RefArray, false, false, false, true)
        DTIN(ArrayParam, this.ADupNumbers, true)
        DTIN(ArrayParam, this.ADupNumbersindex)
        FDNIA(ArrayParam, CompareParam, a, this.FoundIndexes)
    }
    // end of constructor 


} // end of class

/** returns the total number of count of duplicate numbers
  * if 2,2 then the count is 1 meaning that 2 is repeated once*/
function count(ar: number[],
    CountOf: number, /**count of duplicate number to search in ar  */
    bDupValIndex: boolean = false, /**get first occurence index of the CountOf */
    /**  note that the output may be change if you wish to perform a sort
     * not recommended
    */
    bSortGivenArray: boolean = false
) {
    let countIs = 0
    let IDupVal = 0 // for the  duplicate value index

    // kind of unorthodox becuase the client may get confuse the passed array and outcome
    // for inputs like: [1, 2, 2, 0, 0, 2, 4, 4] // now without sort the human eye will say 2 and after sort the computer will output 0
    if (bSortGivenArray) {
        ar.sort((a, b) => a - b) // sorting the array so that the duplicate numbers are next to each other
    }
    for (let i = 0; i < ar.length; i++) {
        let m = ar.findIndex(e => e == CountOf)
        if (ar[i] == ar[m]) {
            countIs = (i - m)
            //  duplicate value index
            IDupVal = ar.findIndex(e => e == ar[i])
        }

    }

    // if there is no duplicate number
    if (countIs == 0) {
        return -1
    }
    // to return the index of the duplicate value
    if (bDupValIndex) {
        return IDupVal
    }

    // to return the count of duplicate value
    return countIs
}
// end of count method 

/**  returns all the number of indexes of the duplicate numbers in an array or if prefered returns all the duplicate numbers in the array 
   *  DTIN= Duplicate Total Index Numbers
   * @param 
   * */
function DTIN(ar: number[], /**  an array to find duplicate value or index */
    fresh_ar: number[], /** to store the total number of duplicate index*/
    bListDuplicateValues: boolean = false, /**returns all the duplicate vlaues in an ar // note: not the index of those values*/
    bSort: boolean = false /**note: may change the output and not recommend*/
) {
    /**rough work:**/
    // let IDupValIdexs: number[] = []
    // ar.sort((a, b) => a - b)
    // for getting the remaining value
    // enum EWays { one_way, another_way }
    // let z: EWays = EWays.another_way

    // console.log("sorted ar: ", ar)

    // this loop will put all the indexes of duplicate numbers expect the last index of the duplicate number
    // for (let i of ar) {
    //     let m = ar.findIndex((e, j) => j == i)
    //     // console.log("found indexes: ", m)
    //     let k = 0

    //     IDupValIdexs.push(m)
    // }

    // this loop will put the last val of the index of duplicate number 
    // for (let i = 0; i < ar.length; ++i) {
    //     let n = ar.indexOf(IDupValIdexs[i])
    //     // console.log("n: ", n)
    //     if (IDupValIdexs[i] == n) {
    //         // console.log("one working")
    //         z = EWays.one_way
    //         IDupValIdexs.push(i)
    //     }
    // }
    // console.log(IDupValIdexs)
    // if (z != EWays.one_way) {
    //     // console.log("another way")
    //     // pushing the indexes 
    //     for (let i = 0; i < ar.length; ++i) {
    //         // console.log("c", this.count(ar, ar[i]))
    //         let n = ar.indexOf(IDupValIdexs[i], i)
    //         // console.log("in", n)
    //         IDupValIdexs.push(n)
    //     }
    //     // console.log(IDupValIdexs)
    //     IDupValIdexs.sort((a, b) => a - b) // important

    // }
    // else if (z == EWays.one_way) {
    //     IDupValIdexs.sort((a, b) => a - b) // important
    //     // removing duplicate val 
    //     IDupValIdexs = IDupValIdexs.filter((e, i) => {
    //         while (e != IDupValIdexs[i - 1]) {
    //             return IDupValIdexs
    //         }
    //     })
    // }
    // console.log("duplicate value indexes: ", IDupValIdexs)
    // for (let i = 0; i < IDupValIdexs.length; ++i) {
    //     fresh_ar[i] = IDupValIdexs[i]
    // }
    //       ar.sort((a, b) => a - b) // important

    if (bSort) {
        ar.sort((a, b) => a - b)
    }

    // an array to compare with all the duplicate values of the parent array
    let z: number[] = []
    FDuplicate(ar, false, false, false, true, z) // get all the duplicate numbers

    // console.log("z: ", z)

    // run through the two array
    // comparing as if comparing the 2d array
    // this is important and is the only way to compare index value with each index value at 
    for (let i = 0; i < ar.length; ++i) {
        for (let j = 0; j < z.length; ++j) {
            if (z[j] == ar[i]) {
                // returns all the duplicate values
                if (bListDuplicateValues && bSort || bListDuplicateValues) {
                    fresh_ar.push(ar[i])
                }
                // returns all the duplicate values indexes 
                else if (bSort || !bListDuplicateValues) { fresh_ar.push(i) }
            }
        }
    }
    // console.log("fresh_z", fresh_ar)
}
// end of DTIN method 

/** returns the first duplicate value in the array or if desired to have last duplicate number that can be get too or 
  * wish to get all the duplciate number
  * though you can view the total number of duplicate values in the array too
  * F stands for Find
 */
function FDuplicate(ar: number[], /**array parameter*/
    viewDuplicateNumbers: boolean = false, /**to view total number of duplicate number in the array parameter*/
    FDuplicateNumber: boolean = false, /**to view first duplicate number in the array parameter*/
    LDuplicateNumber: boolean = false, /**to get last duplicate number in the array parameter*/
    bBothTheValues: boolean = false,  /**to get both the duplicate numbers in the array parameter*/
    DuplicateNumbers: number[] = [], /**you can even pass an another array to get both the duplicate number*/
    bSortAr: boolean = false, /**note the output may change and you may get confuse and it is not recommend*/
) {
    if (bSortAr) { ar.sort((a, b) => a - b) }
    let StoreBothValues: number[] = []
    let cDuplicateNumberIndex = 0
    // looping for first duplicate value
    for (let i = 0; i < ar.length; i++) {
        // get the index of the duplicate number
        let m = count(ar, i, true)

        // unless m has duplicate numbers
        // get the count of those duplicate index
        if (m != -1) {
            // count of duplicate number
            cDuplicateNumberIndex = count(ar, ar[m])
            //  valid for input like: col1 = [1, 2, 2, 0, 0, 2, 4, 4] / becuase count will sort the array
            StoreBothValues.push(ar[m]) // storing those values
            if (viewDuplicateNumbers) {
                // console.log("the count of duplicate value: ", cDuplicateNumber)
                // console.log("found duplicate numbers: ", ar[m])
                // console.log("index: ", cDuplicateNumberIndex)
            }
        }
    }
    // looping for last duplicate value
    let LastDupNum = 0
    for (let i = 0; i < ar.length; i++) {
        let h = ar.findIndex((e) => e == ar[i])
        let co = count(ar, ar[i], true)

        if (co != -1) {
            LastDupNum = h
            // console.log(LastDupNum)
        }
    }

    // note: returning StoreBothValues at index 0 and len-1 may not return the duplicate value
    // returns first duplicate number
    // if (FDuplicateNumber) {
    //     return ar[cDuplicateNumberIndex]
    // }
    // returns the last duplicate number
    // if (LDuplicateNumber) {
    //     return ar[LastDupNum]
    // }
    // returns all the duplicate numbers in an array parameter
    // if (bBothTheValues && DuplicateNumbers != ar) {
    //     for (let i = 0; i < StoreBothValues.length; ++i) {

    //         DuplicateNumbers[i] = StoreBothValues[i]  // just storing the values in the array

    //     }
    //     return StoreBothValues
    // } else if (bBothTheValues && DuplicateNumbers == ar) {
    //     // console.log("please provide a fresh array")
    //     return -1

    // }

    // note: returning StoreBothValues at index 0 and len-1 may not return the duplicate value
    switch (true) {
        case FDuplicateNumber: {
            return ar[cDuplicateNumberIndex]
        } break
        case LDuplicateNumber: {
            return ar[LastDupNum]
        } break
        case bBothTheValues && DuplicateNumbers != ar: {
            for (let i = 0; i < StoreBothValues.length; ++i) {

                DuplicateNumbers[i] = StoreBothValues[i]  // just storing the values in the array
            }
            return StoreBothValues
        } break
        case bBothTheValues && DuplicateNumbers == ar: {
            // console.log("please provide a fresh array")
            return -1
        } break
        default: {
            // console.log("please provide true to any of the one boolean value")
            return -1
        }
    }
}
// end of FDuplicate method

/**  returns the index value and index at the parent array that has been compared with child array 
 * FDNIA= Find Duplicate Number Index Array */
function FDNIA(
    /** no need worry about the parent and child definition you can pass as you wish to pass*/
    parent: number[], /**an array of highest len*/
    child: number[], /**an array of lowest len than parent*/
    ToGet: Acoordon, /**an enum to proceed to desired outcome*/
    fresh_ar: number[] /**to store desired outcome*/
) {
    let x: number[] = [] // to store dup num of parent
    let y: number[] = []  // to store dup num of child
    DTIN(parent, x)
    DTIN(child, y)
    // console.log("x: ", x)
    // console.log("x: ", y)

    // operator plus is important as it allows any cases to work with
    switch (+ToGet) {
        case Acoordon.Aindexes:
            {
                // lopping sequnce: from child to parent
                // returns all the indexes found in the comparision of the highest len
                if (parent.length > child.length) {
                    for (let i = 0; i < y.length; ++i) {
                        for (let j = 0; j < x.length; ++j) {
                            if (parent[j] == child[i]) {
                                // console.log(j)
                                fresh_ar.push(j)
                            }
                        }
                    }
                }
                else if (child.length >= parent.length) {
                    for (let i = 0; i < x.length; ++i) {
                        for (let j = 0; j < y.length; ++j) {
                            if (child[j] == parent[i]) {
                                // console.log(j)
                                fresh_ar.push(j)
                            }
                        }
                    }
                }
            } break
        case Acoordon.Aoccurence:
            // returns the value of all the first occurence of the duplicate number in the array that is iterated on the highest len
            {
                if (parent.length > child.length) {
                    for (let i = 0; i < y.length; ++i) {
                        for (let j = 0; j < x.length; ++j) {
                            if (parent[j] == child[i]) {
                                //  // console.log("dup num: ", parent[j])
                                fresh_ar.push(parent[j])
                            }
                        }
                    }
                }
                else if (child.length >= parent.length) {
                    for (let i = 0; i < x.length; ++i) {
                        for (let j = 0; j < y.length; ++j) {
                            if (child[j] == parent[i]) {
                                // console.log(child[j])
                                fresh_ar.push(child[j])
                            }
                        }
                    }
                }
            } break
        case Acoordon.Findex:
            // returns  the index of all the first occurence of the duplicate number in the array that is iterated on the highest len
            {
                if (x.length > y.length) {
                    for (let i = 0; i < x.length; ++i) {
                        if (parent[i] == child[i]) {
                            // console.log("pf: ", i)
                            fresh_ar.push(i)
                        }
                    }
                } else if (y.length >= x.length) {
                    for (let i = 0; i < y.length; ++i)
                        if (child[i] == parent[i]) {
                            // console.log("cf: ", i)
                            fresh_ar.push(i)
                        }
                }
            } break
        case Acoordon.Foccurence:
            // returns the value of all the first occurence of the duplicate number in the array that is iterated on the highest len
            {
                if (x.length > y.length) {
                    for (let i = 0; i < x.length; ++i) {
                        if (parent[i] == child[i]) {
                            // console.log("pf: ", parent[i])
                            fresh_ar.push(parent[i])
                        }
                    }
                } else if (y.length >= x.length) {
                    for (let i = 0; i < y.length; ++i)
                        if (child[i] == parent[i]) {
                            // console.log("cf: ", child[i])
                            fresh_ar.push(child[i])
                        }
                }
            } break
        default: {
            // console.log("please give true to any one of the boolean value")
        }
    }
    return fresh_ar
}
// end of FDNIA method 
/** swaps two array with each 
* and can also keep second array without swapping
*/
function swap(
    ar: number[], numsToswapWith: number[],
    bKeepnumsToswapAsItis: boolean = false,/**doesnt swap values of ar in the numsToswapWith  */
) {
    let temp = [...ar] // take all the number of ar2
    // do normal swapping

    ar.splice(0, ar.length, ...numsToswapWith)
    if (bKeepnumsToswapAsItis) { }
    else {
        numsToswapWith.splice(0, temp.length, ...temp)
    }
}
// end of method swap 

/** swaps the array value at the inx 
 * Vswap: variant swap
 * does normal swapping but on as per index
 * if provided only value it doesnt only swap it with the value index
 * note not to pass the index that is out of bounds
 * recommendation: pass index,
 * one of working with this method is like pass and pass
 * example: for [5,4,3,2,1]
 *       let c = Vswap(ar, ar[i], true, false, i + 1)
 *      let d = Vswap(ar, c, true, false, i + 1) 
 */
function Vswap(ar: number[],
    i: number, /**value to swap 
    note that if not provided the index this will be your index and value too  */
    bIndex: boolean = false, /** above value to swap at index */
    bReverse: boolean = false, /**whether are you passing the negative index value */
    inx: number = -1 /**index to swap i and -1 is the value for the reverse iteration */
) {

    if (inx == -1 && bIndex == true && !bReverse) {
        // console.log("please pass the positive index ")
        return -1
    }
    if (inx >= ar.length) {
        // console.log("invalid index")
        return -1
    }
    // console.log(inx)
    if (!bIndex) {
        let temp = ar[i]
        ar[i] = i
        i = temp
        // console.log("i: ", i)
    } else {
        let temp = ar[inx]
        ar[inx] = i
        i = temp
    }
    return i
}
// end of method Vswap

/**
 *  swaps the value inside of an array
 *  you just have to pass the index 
 *  V2swap: V2 variant two swap
 * @param ar: an array param for swapping the index value
 * @param domain: an index swap domain with range
 * @param range : an index swaps with domain 
 * example: [1,2,3]=>[dom, range]=[0,2] => [3,2,1]
 */
function V2swap(ar: number[], domain: number, range: number) {
    let g: number, h: number
    // if (domain == range) {
    //     // console.log("cant swap with same index")
    // }
    if (domain > ar.length || range > ar.length) {
        // console.log("index out of bounds")
    }

    g = Vswap(ar, ar[domain], true, false, range)
    h = Vswap(ar, g, true, false, domain)

}

// end of V2swap method

/**
 * 
 * @param first: begin of an collection
 * @param last : end of an collection
 * @param init : initialization 
 * @returns: the sum of the given value init and the elements in the range [first,last]
 */
function accumulate(first: number, last: number, init: number) {
    for (; first != last; ++first) {
        init = init + first
    }
    return init
}

/**
 * 
 * @param ar : a parent array to find a median
 * @returns : an average 
 */
function median(ar: number[]): number {
    let med: number = 0
    let sum_of_element: number = 0
    for (let i = 0; i < ar.length; ++i) {
        sum_of_element += i
    }
    med = Math
        .round(sum_of_element / ar.length)
    return med
}

/**
 * 
 * @param begin: begining of an collection
 * @param end : end of an collection
 * @returns distance of the element; for example, [3,6] the distance =3
 */
function distance(begin: number, end: number) {
    let result = 0
    while (begin != end) {
        ++begin
        ++result
    }
    return result
}


/**
 * REven: range of even numbers
 *  
 * @param n: domain
 * @param n2: range
 * @returns: an array of even numbers if found domain and range else either domain or range
 */
function REven(n: number, n2: number): number[] {
    let ar: number[] = [] // even numbers
    let found: number[] = []
    let len = 0
    // get the highest number as the len
    if (n > n2)
        len = n
    else
        len = n2
    // push the elem 
    for (let i = 2; i <= len + len; i += 2) {
        ar.push(i)
    }
    let x = ar.filter((e, i) => e == n2)
    let y = ar.filter((e, i) => e == n)
    // both values are even
    if (y != null && x != null) {
        found = [...y, ...x]
    }
    else if (y != null) {
        found = [...y]
    }
    else if (n != null) {
        found = [...x]
    }
    return [...found]
}
// checks if the number is evens
/**
 * 
 * @param n: number to test  
 * @returns that satisfy the condition of even number
 */
function even(n: number): boolean {
    return n % 2 == 0
}
// console.log("even: ", REven(13, 14))

/**
 * ROdd: range of odd numbers
 * 
 * @param n: domain
 * @param n2: range
 * @returns: an array of odd numbers if found domain and range else either domain or range
 */
function ROdd(n: number, n2: number) {
    let ar: number[] = [] // even numbers
    let found: number[] = []
    let len = 0
    // get the highest number as the len
    if (n > n2)
        len = n
    else
        len = n2
    // push the elem 
    for (let i = 3; i <= len + len; i += 2) {
        ar.push(i)
    }
    let x = ar.filter((e, i) => e == n2)
    let y = ar.filter((e, i) => e == n)
    // both values are even
    if (y != null && x != null) {
        found = [...y, ...x]
    }
    else if (y != null) {
        found = [...y]
    }
    else if (n != null) {
        found = [...x]
    }
    return [...found]

}

/**
 * 
 * @param n: number to test 
 * @returns that satisfy the condition of odd number 
 */
function odd(n: number) {
    return n % 2 != 0
}

// console.log(GCM(1317, 56))

function LCM(a: number, b: number) {
    let temp = 0
    // normal swapping
    if (b > a) {
        temp = b
        a = b
        b = temp
    }
    return (a * b) / ((LinearCombination(a, b)))
}

/**
 * 
 * @param num: to find factors of
 * @param excludeOne: to not include
 * @returns list of portion of a quantity
 * for example:16 factors: [1,2,4,8,16]
 */
function factors(num: number, excludeOne: boolean = false): number[] {
    let fac: number[] = []
    switch (true) {
        case even(num): {
            // console.log('even')
            fac = EvenFactors(num, excludeOne)
        } break

        case odd(num) && !primeNumber(num): {
            // console.log('odd')

            fac = OddFactors(num, excludeOne)
        } break

        default: {
            // console.log('not')
            fac = [1, num]
            if (excludeOne)
                fac = erase(fac, 1)
        }
    }
    return [...fac]
}

function PrimeFactors(num: number) {
    let prim = []
    for (let i = 1; i < 8; ++i) {
        if (primeNumber(i) && num % i == 0) {
            prim.push(i)
        }
    }
    console.log(prim)
    for (let i = 0; i < prim.length; ++i) {
        let x = []
        let f = num
        let two = num % 2 == 0
        let three = num % 3 == 0
        let five = num % 5 == 0
        let seven = num % 7 == 0
        while (!primeNumber(f)) {
            console.log('f: ', f)
            switch (true) {
                case f % prim[0] == 0:
                    { }
                    break;
                case f % prim[1] == 0:
                    { }
                    break;
                case f % prim[2] == 0:
                    { }
                    break;

                default:
                    break;
            }
        }
    }
}

PrimeFactors(120)

/**
 * 
 * @param num: range to compute on the product of series
 * @returns compute product of series
 */
function factorial(num: number): number {
    let fac: number = 1
    for (let i: number = 1; i <= num; ++i) {
        fac *= i

    }
    return fac
}

/**
 * 
 * @param n: domain
 * @param n2 :range
 * @returns n elements taken at n2 time 
 */
function Combination(n: number, n2: number) {
    let formula = 0
    let temp = 0
    // doing normal sawpping
    if (n < n2) {
        temp = n
        n = n2
        n2 = temp
    } else {
        temp = n2
        n2 = n
        n = temp
    }
    return formula = factorial(n) / (factorial(n2) * (factorial(n - n2)))
}
// console.log(Combination(2, 9))
/**
 * 
 * @param ar: an array to find the lowest common number
 * @returns highest common number in an array
 */
function highestCommonNumberInArray(...ar: number[]) {
    // for-safety
    let highest = ar
    highest.sort((a, b) => b - a)
    return highest[0]
}

/**
 * 
 * @param ar: an array to find the lowest common number
 * @returns lowest common number in an array
 */
function lowestCommonNumberInArray(ar: number[]) {
    let lowest = ar
    lowest.sort((a, b) => b - a)
    return lowest[0]
}

/**
 * parent odd numbers: 3, 5
 * because lets say 81's fac: 9, 3 than 3 is the parent of 9
 * @param num: composite odd numbers 
 * @returns parent odd number
 */
function OddDivisbleBy(num: number) {
    let pn: boolean = primeNumber(num)
    let e: boolean = even(num)
    // console.log(pn, e)
    // console.log(num)
    let eq1, eq2, eq3, eq4, eq5 = 1
    //  // console.log("num: ", num)
    if (!pn && !e) {
        //  console.log(true)
        eq1 = (num / 2)
        eq2 = Math.round((eq1 - 3) / 3)
        eq3 = (num / eq2)

        if (eq3 == 3) {
            //   console.log("divisble by 3: ", eq3)
            return eq3
        }
        if (num == 9) {
            // console.log("num==9")
            eq4 = (Math.trunc((num / eq2)) + 1) - 4
            eq4 -= 3
            eq5 = eq4
        }
        else {
            // console.log("else eq4")
            // eq4 = (Math.trunc((num / eq2)) + 1) - 4
            eq4 = (Math.trunc((num / eq2)) + 1)
            for (let i = 1; i <= eq1; ++i) {
                eq4 -= i
                if (num % eq4 == 0) {
                    eq5 = eq4
                    //  console.log("found: ", eq4)
                }
            }
        }
    }
    else {
        return -1
    }
    // tho i am aware of the abs method this is done so that you can play with negative prime numbers too
    if (eq5 < 0) {
        eq5 *= -1
    }
    return eq5
}

/**
 * 
 * @param num: any interger rather than zero
 * @returns true if staisfy the condition
 */
function primeNumber(num: number): boolean {

    if (num == 2 || num == 3 || num == 5 || num == 7) return true
    let pn = false
    let two: boolean = num % 2 == 0
    let three: boolean = num % 3 == 0
    let five: boolean = num % 5 == 0
    let seven: boolean = num % 7 == 0
    switch (true) {
        case two: {
            return pn
        } break
        case three: {
            return pn
        } break
        case five: { return pn } break
        case seven: {
            return pn
        } break
        // catches the prime number
        default: {
            pn = true
            // special case
            if (num == 1) {
                pn = false
            }
            return pn
        }
    }
}

/**
 * 
 * @param lhs: dividend
 * @param rhs: divisor
 * @returns returns the remainder of the division of lhs by rhs
 */
function modulous(lhs: number, rhs: number) {
    return lhs % rhs
}

/**
 * 
 * @param ar: range of the numbers 
 * @returns an array that satisfy the condition of composite numbers 
 */
function getCompositeNumber(ar: number[]): number[] {
    let len = 2
    let cn: number[] = []
    // because 0 and 1 is neither prime nor composite number
    let search = ar.filter((e) => {
        while (e !== 1 && e != 0) {
            return e
        }
    })
    if (ar.length >= highestCommonNumberInArray(...ar)) {
        len = ar.length
    } else {
        len = highestCommonNumberInArray(...ar)
    }
    for (let i of search) {
        if (!primeNumber(i)) {
            cn.push(i)
        }
    }
    return [...cn]
}

/**
 * 
 * @param ar: to search in the range
 * @returns list of all the prime numbers in an array
 */
function getPrimeNumber(ar: number[]) {
    return ar.filter((e) => {
        while (primeNumber(e) && e != 0 && e != 1) {
            return e
        }
    })
}

/**
 * an applied Euclidean algorithm and Gabe algorithm
 * 
 * @param smaller: divisor alike number except zero
 * @param greater: dividend alike number except zero
 * @returns gcd or greatest common divisor of two number 
 */
function LinearCombination(smaller: number, greater: number) {
    let gcd = 0
    if (greater % smaller == 0) {
        gcd = smaller
    }
    let r = 1, res = 0, i = 0
    let a = greater, b = smaller
    // making sure that b always remains small
    if (smaller > greater) {
        a = smaller
        b = greater
    } else {
        a = greater
        b = smaller
    }
    // special case: Gabe algorithm
    // Hui pointed out that since the sum of two intergers is even every linear combination of 8 and 12 must be even
    // Nick gave an argument that 2 is not a linear combination but 1 is the sum of two even numbers 
    // they termed (8,12) a special case with the notation: splc(8,12)
    // the whole thoery of Gabe simply says that for every linear combination 
    // one of the diviors of splc(a,b) matches either a and b
    // tho he has provided formula but it was kind of messy and rather I just focus on understanding with the example given 
    // in the pdf Joy of Numbers
    if (even(a) && even(b)) {
        res = a % b
        r = Math.floor(a / b)
        let afactor = EvenFactors(a, true)
        let bfactor = EvenFactors(b, true)

        let heap: number[] = [...afactor, ...bfactor] // storing the divisors of the number

        for (let i of heap) {
            // important
            if (i * 2 == a || i * 2 == b) {
                gcd = i
            }
        }
    }
    else {
        r = Math.floor(a / b) // remainder
        res = a % b // result

        // this is the Euclid's divison method
        // an alternative for chinese division
        while (res >= 0) {
            gcd = b // important
            a = b * r + res
            // normal swapping
            a = b
            b = res
            res = a % b
            r = Math.floor(a / b)
        }
    }
    return gcd
}
// console.log(LinearCombination(8, 12))
// LinearCombination(45, 210)

// console.log("what: ", OddDivisbleBy(15))

// console.log("prime: ", primeNumber(35))

/**
 * 
 * @param n: range
 * @returns an average of the range
 */
function meanOfASequenceOfNumbers(...n: number[]) {
    let xBar = 0
    for (let i = 0; i < n.length; ++i) {
        xBar += n[i] / n.length
    }
    return xBar
}
/**
 * 
 * @param range: dividend alike 
 * @param domain: divisor alike
 * @returns coefficient of various terms of a binormial that has been expanded
 * @retruns or you can to know what polynomial you get if you raise a binomial to a large power
 */
function binomial(range: number, domain: number): number {
    if (range < domain) {
        let temp = domain
        domain = range
        range = temp
    }
    if (range < 0 || domain < 0) {
        return -1
    }
    return factorial(range) / (factorial(range - domain) * (factorial(domain)))
}
// console.log(binomial(20, 3))

/**
 *
 * my own created algorithm
 * note that for prime numbers it returns 1 
 * because 1 and prime number itselft are  the only numbers that is divisible by
 
 * @param n : any integeral number
 * @returns len of total number of an integeral number
 * 
 */
function NumberOfDivisors(n: number): number {

    let term = 0
    let sum = 0
    let efound = [] // collection of even numbers 
    let pfound = [] // collection of prime numbers 
    let ofound = [] // collection of odd numbers that are not prime numbers 
    for (let i = 1; i <= n; ++i) {
        term = i * n
        i + 1
        sum = n / i
        if (even(sum)) {
            efound.push(sum)
            efound.push(i)
        }
        else if (primeNumber(sum)) {
            pfound.push(sum)
            pfound.push(i)
        }
        //   // console.log(term, sum)
    }

    let divisor: number = 0

    //   // console.log(efound)
    if (n != 1)
        switch (true) {
            case efound[efound.findIndex((e) => e == n)] == n: {
                // console.log("even")
                let x = RemoveDuplicateVal(efound)
                //  // console.log(x)
                divisor = x.length - 1
            } break
            case pfound[efound.findIndex((e) => e == n)] == n: {
                // console.log("pfound")
                let x = RemoveDuplicateVal(pfound)
                divisor = x.length
            } break
            // for odd
            default: {
                //  // console.log("odd")
                for (let i = 1; i <= n; i += 2) {
                    if (n % i == 0) {
                        //   // console.log(i)
                        ofound.push(i)
                    }
                }

            }
                divisor = ofound.length - 1
        }
    else divisor = 1
    //   // console.log(RemoveDuplicateVal(ofound))
    return divisor
}

// console.log("Number of diviors: ", NumberOfDivisors(5))

// returns prime factors numbers
/**
 * 
 * @param n: an even number 
 * @param bExclueOne: whether to exclude one from the output 
 * @returns  all the even numbers expression as the multiplication of factors
 */
function EvenFactors(n: number, bExclueOne: boolean = false): number[] {
    let term = 0
    let sum = 0
    let found = []
    if (primeNumber(n) || odd(n)) {
        return [-1]
    }
    for (let i = 1; i <= n; ++i) {
        term = i * n
        i + 1
        sum = n / i
        if (sum % 2 == 0) {
            found.push(sum)
            found.push(i)
        }
    }
    let divisor = RemoveDuplicateVal(found)
    if (bExclueOne) {
        divisor.splice(0, 1)
    }

    return [...divisor]
}
// returns odd number prime factors
// bExcludeOne: if true than we exclude the one from an array
/**
 * 
 *  @param n: an odd number 
 * @param bExclueOne: whether to exclude one from the output 
 * @returns all the  odd numbers expression as the multiplication of factors
 */
function OddFactors(n: number, bExclueOne: boolean = false): number[] {
    let ofound = []
    if (primeNumber(n) || even(n)) {
        return [-1]
    }
    for (let i = 1; i < n; i += 2) {
        if (n % i == 0) {
            ofound.push(i)
        }
        //   // console.log(i)
    }
    if (bExclueOne) {
        ofound.splice(0, 1)
    }
    //  // console.log(ofound)
    return [...ofound]
}
/**
 * for better understanding
 */
enum ForDivisor {
    numberOfDivisors, // total number of factors or divisors
    SumofAllTheDivisors, // where the power of 'i' is one
    aliquot_sum_of_proper_divisors // sum of the factors 
}

// returns te ouput as per the enum ForDivisor
/**
 * 
 * @param n: an even number
 * @param e: which suggest the need to usage
 * @returns as per enum ForDivisor
 */
function EvenDivisors(n: number,
    e: ForDivisor
): number {
    let term0 = 0, term1 = 0
    let x = 0
    let divisors = EvenFactors(n)
    if (odd(n) || primeNumber(n)) {
        return -1
    }
    //  // console.log("diviosrs: ", divisors)
    for (let i of divisors) {
        term0 += Math.pow(i, x)
    }
    //  // console.log("term: ", term0)
    x = 1
    for (let i of divisors) {
        term1 += Math.pow(i, x)
    }
    // console.log("term: ", term1)

    let sum = 0
    for (let i = 0; i < divisors.length - 1; ++i) {
        sum += divisors[i]
        // console.log(divisors[i])
    }
    //    // console.log("sum: ", sum)
    let y = 0
    switch (e) {
        case ForDivisor.numberOfDivisors: {
            y = term0

        } break
        case ForDivisor.SumofAllTheDivisors: {
            y = term1
        } break

        case ForDivisor.aliquot_sum_of_proper_divisors: {
            y = sum
        } break
    }
    return y
}

// place value family
// the mathematical family of numbers 
// tip: for decimal number divide it by PVF 
enum fPVF {
    unit = 1, tens = 0.1, hundred = 0.01, thousand = 0.001, tthousand = 0.0001,
    lakh = 0.00001, tlakh = 0.000001
}

// my own theorem of decimal to number
// note: long long decimal number or long decimal number are not allowed
// a long number here: 1^10-7
function DecimalToNumber(n: number) {
    /**
         a recursive way but lacks when you pass a decimal number that is in range of lakh 
        // let t=10 // ten
        // let x = n * t // to remove all the decimal number
        // let gcm = Math.round(LinearCombination(x, t))
        // // console.log([x, Math.round(gcm)])
        // if (gcm == 0) {
        //     // console.log(x)
        //     t *= 10
        //     gcm = Math.round(LinearCombination(x, t))
        //     return DecimalToNumber(x)
        // }
        // console.log(t)
        return x
        */

    let pv = PlaceValue(n)
    let y = n * pv
    return y
}



// returns place value of a number if prefered else the place value
// range=[unit, ten quadrillions]
function PlaceValue(n: number, bGetNumber: boolean = false) {

    let integeral = 0

    // an integeral or int
    if (Number.isInteger(n)) {
        if (bGetNumber) {
            integeral = countIntegeralZero(n)
        } else {
            integeral = countIntegeralZero(n, true)
        }
    }
    // a float or decimal 
    else {
        if (bGetNumber) {
            integeral = countDecimalZero(n)
        } else {
            integeral = countDecimalZero(n, true)
        }
    }
    return integeral
}

// range=[unit, ten quadrillions]
/**
 * 
 * @param n: decimal number
 * @param bPlaceValue: returns the place value of the decimal number 
 * @returns either conversion from decimal to integeral value or place value
 * place value: family of tens
 * for example: 0.12 then place value will be 100
 */
function countDecimalZero(n: number, bPlaceValue: boolean = false) {
    // so that only decimal values are allowed
    try {
        if (Number.isInteger(n))
            throw n
    } catch (e) {

        throw (`${e} is not a decimal number`)
    }

    let t = 0, i = 0, a = 0, b = 0
    let x = n
    t = 1
    a = 0
    b = a
    i = 0
    let tens: number[] = []
    let ar: number[] = []

    // separating the number
    // the max running is till ten quadrillions
    // meaning you can pass values up to ten quadrillions
    while (i < 100) {
        // this is done so that the value 1 means at 10 in view of decimal and it is valid
        // because a dot(.) is counted as a 10
        // for int value 1 is at unit
        t *= 10
        a = x * t // gobble the first integer
        // console.log('b: ', [b])
        b = Math.ceil(a) // ceil it so that we only get integral number
        ar.push(b) // push the b
        a = a - b // remove the value from the a and redo the step for the a
        tens.push(t) // push the place values
        i++
    }

    let search = ar[i] / tens[i]
    let foundar = 0
    let place_value = 0
    i = 0
    // value with the decimal value
    while (search != n) {
        search = ar[i] / tens[i]
        if (search == n) {
            foundar = i
            place_value = i
        }
        ++i
    }

    let integeral = 0
    // console.log("found: ", ar[foundar], "place value: ", tens[place_value])
    if (bPlaceValue) {
        // for place value
        integeral = tens[place_value]
    }
    else {
        // integeral value
        integeral = ar[foundar]
    }
    return integeral
}


// returns the place value else if prefered returns an integeral number
// note conversions of an integeral to decimal doesnt happen
// range=[unit, ten quadrillions]
/**
 * 
 * @param n: integeral number
 * @param bPlaceValue: returns the place value of the integeral number 
 * @param bPlaceValueDecimal: returns the place value of the integeral number that is converted 
 * for example 1234 then covnerted value will be 0.1234 then the actual place value of this number is 10,000
 * @returns either conversion from integeral to decimal value or place value
 * place value: family of tens
 * for example: 12 then place value will be 10
 */
function countIntegeralZero(n: number, bPlaceValue: boolean = false, bPlaceValueDecimal = false) {
    // the formula is same as countDecimalZero but here the value is divided by the place value
    // note you can use the method countDecimalZero because the decimal value and integeral value's place value differs
    // for example: 0.12=100 because dot is considered to be zero too
    // 12=10 
    try {
        if (Number.isInteger(n) == false) {
            throw n
        }
    } catch (e) {
        throw (`${e} is not an integeral value`)
    }

    let t = 0, i = 0, a = 0, b = 0
    let x = n
    t = 1
    a = 0
    b = a
    i = 100
    let tens: number[] = []
    let ar: number[] = []

    // separating the number
    // the max running is till ten quadrillions
    // meaning you can pass values up to ten quadrillions
    while (i > 0) {
        // this is done so that the value 1 means at 10 in view of decimal and it is valid
        // because a dot(.) is counted as a 10
        // for int value 1 is at unit
        t /= 10
        a = x * t // gobble the first integer
        // console.log('b: ', [b])
        b = Math.ceil(a) // ceil it so that we only get integral number
        ar.push(b) // push the b
        a = a - b // remove the value from the a and redo the step for the a
        tens.push(t) // push the place values
        i--
    }

    let search: number = n * tens[i]
    let place_value = 0
    i = 0
    const j = 0

    // value with the decimal value
    while (search != 0) {
        search = Math.round(n * tens[i])
        place_value = i
        i++
    }
    let integeral = 0
    let convertedNum = n / countDecimalZero(tens[place_value], true)
    switch (true) {
        case bPlaceValue: {
            // for place value
            // div by 10 becuase we made the number 0
            // for example: 1234 
            // then the number made from while loop: 0.1234
            // which we dont want
            // if not div by 10 then 1234's tens value will be 10,000 rather than 1000 
            integeral = countDecimalZero(convertedNum, true) / 10

        } break
        case bPlaceValueDecimal: {
            // acutal decimal value to convert int into zero point 
            // for example: 1234 then the num will be 0.1234 and its pv will be 10,000
            integeral = countDecimalZero(convertedNum, true)
        } break
        default: {
            // decimal value
            // if passed 1234 the value will be 0.1234
            integeral = n / (countDecimalZero(convertedNum, true))
        }
    }
    return integeral
}
var z = .100;
var j = PlaceValue(z, true)
console.log(j)
// returns the ratio of two number
// incomplete: round of repeating decimal number is left
class Ratio {
    numerator: number = -1 // numerator
    denominator: number = -10 // denominator

    constructor(num: number) {
        this.ratio(num.valueOf())
    }
    // to pass values directly to the fields
    private ratio(num: number): void {

        let n = -1, d = -1, integeral, nfac, pvfac, pv

        console.log('num:', num)
        integeral = PlaceValue(num, true)
        // place value: like unit, tens, hundredth
        pv = PlaceValue(num, false)
        // factors of int(num)
        nfac = factors(integeral)
        // factors place value
        pvfac = factors(pv, true)

        // set of factors of both num and place value
        let set = [...nfac, ...pvfac]

        // intersection of set's element 
        let intersection: number[] = []
        DTIN(set, intersection, true)

        intersection = RemoveDuplicateVal(intersection)
        if (intersection.length == 0) {
            intersection[0] = LinearCombination(integeral, pv)
        }

        // run the loop till the number of intersection element
        for (let i = 0; i < intersection.length; i++) {
            d = pv / intersection[i]
            n = integeral / intersection[i]

            if (n / d != num) {
                d = pv / intersection[i]
                n = integeral / intersection[i]
            }
        }

        // for-safety purpose
        // for example without this loop the ratio of 0.25 will be 5/20 rather than the complete fraction 1/4
        let gcm = LinearCombination(n, d)
        while (gcm != 1) {
            if (gcm == 0)
                break
            n /= gcm
            d /= gcm
            gcm = LinearCombination(n, d)
        }
        console.log(n / d, num, pv, integeral, gcm)
        if (integeral < 0 || integeral > 0) {

            if (primeNumber(integeral)) {
                console.log('prime')
                this.numerator = integeral
                this.denominator = pv
            }
            if (n / d == num) {
                console.log(true)
                this.numerator = n
                this.denominator = d
            }
        }
        else {
            console.log('else')
            this.numerator = integeral
            this.denominator = pv
        }

        try {
            if (d == 0) {
                throw ('error')
            }
        } catch (e) {
            throw (`cannot divide with  ${e} `)
        }
    }

    // for personal use same as ratio
    protected Fraction(num: number, bNum = false) {

        let n = -1, d = -1, integeral, nfac, pvfac, pv


        integeral = PlaceValue(num, true)

        // place value: like unit, tens, hundredth
        pv = PlaceValue(num, false)
        // factors of int(num)
        nfac = factors(integeral)
        // factors place value
        pvfac = factors(pv, true)

        // set of factors of both num and place value
        let set = [...nfac, ...pvfac]

        // intersection of set's element 
        let intersection: number[] = []
        DTIN(set, intersection, true)

        intersection = RemoveDuplicateVal(intersection)
        if (intersection.length == 0) {
            intersection[0] = LinearCombination(integeral, pv)
        }
        // run the loop till the number of intersection element
        for (let i = 0; i < intersection.length; i++) {
            d = pv / intersection[i]
            n = integeral / intersection[i]

            if (n / d != num) {
                d = pv / intersection[i]
                n = integeral / intersection[i]
            }
            // console.log([d, n])
            // console.log([intersection[i]])
        }

        // console.log(intersection)

        // console.log('int: ', integeral)
        // console.log('pv: ', pv)
        // console.log('prime: ', primeNumber(integeral))
        if (primeNumber(integeral) && even(pv)) {
            // console.log('prime')
            n = integeral
            d = pv
        }
        else if (n / d == num) {
            // console.log(true)
            n = n
            d = d
        }
        if (bNum == true) {
            return n
        } else {
            return d
        }
    }

}

// add, multiply, and subtract of a rational number
// subtraction of rational number is case sensitive
// to do: testing with irrational number and under root numbers
// incomplete: not clarified with 100%
class RationalNumber extends Ratio {
    constructor(x: number, y: number) {
        super(x)
        this.ratio1 = {
            num: super.Fraction(x, true),
            den: super.Fraction(x, false),
        }
        this.ratio2 = {
            num: super.Fraction(y, true),
            den: super.Fraction(y, false),
        }

        this.Addition()

        this.Subtract()
        this.Multiplication()
        this.Division()
    }

    protected Addition() {
        switch (true) {
            case !this.EqualityTest(this.ratio1.den, this.ratio2.den):
                {
                    // console.log(true)
                    // x + y = xr+yq
                    // q    r       qr
                    // xr
                    let num1Mdeno2 = this.ratio1.num * this.ratio2.den
                    // yq
                    let num2Mdeno1 = this.ratio2.num * this.ratio1.den
                    // qr
                    let deno1Mdeno2 = this.ratio1.den * this.ratio2.den

                    this.ratio3 = {
                        num: num1Mdeno2 + num2Mdeno1,
                        den: deno1Mdeno2
                    }
                } break

            case this.EqualityTest(this.ratio1.den, this.ratio2.den):
                {
                    // console.log('else')
                    // x+ y = x+y/q
                    // q   q
                    this.ratio3 = {
                        num: this.ratio1.num + this.ratio2.num,
                        den: this.ratio2.den
                    }
                } break
            default: {
                // console.log(-1)
            }
        }
        let n, d
        n = this.ratio3.num
        d = this.ratio3.den
        switch (true) {
            case (n < 0): {
                n = -(this.ratio3.num)
                this.RAdd = {
                    num: -super.Fraction(n / d, true),
                    den: super.Fraction(n / d, false)
                }
            } break
            case (d < 0): {
                d = -(this.ratio3.den)
                this.RAdd = {
                    num: super.Fraction(n / d, true),
                    den: -super.Fraction(n / d, false)
                }
            } break
            case (n < 0 && d < 0): {
                n = -(this.ratio3.num)
                d = -(this.ratio3.den)
                this.RAdd = {
                    num: -super.Fraction(n / d, true),
                    den: -super.Fraction(n / d, false)
                }
            } break
            default: {
                this.RAdd = {
                    num: super.Fraction(n / d, true),
                    den: super.Fraction(n / d, false)
                }
            }
        }
        // console.log("ratio1: ", this.ratio1)
        // console.log("ratio2: ", this.ratio2)
        // console.log("ratio3: ", this.ratio3)
        // console.log('add: ', this.add_ratio)
    }

    protected Subtract() {
        switch (true) {
            case !this.EqualityTest(this.ratio1.den, this.ratio2.den):
                {
                    // console.log(true)
                    // x + y = xr+yq
                    // q    r       qr
                    // xr
                    let num1Mdeno2 = this.ratio1.num * this.ratio2.den
                    // yq
                    let num2Mdeno1 = this.ratio2.num * this.ratio1.den
                    // qr
                    let deno1Mdeno2 = this.ratio1.den * this.ratio2.den

                    this.ratio3 = {
                        num: num1Mdeno2 - num2Mdeno1,
                        den: deno1Mdeno2
                    }
                } break

            case this.EqualityTest(this.ratio1.den, this.ratio2.den):
                {
                    // console.log('else')
                    // x+ y = x+y/q
                    // q   q
                    this.ratio3 = {
                        num: this.ratio1.num - this.ratio2.num,
                        den: this.ratio2.den
                    }
                } break
            default: {
                console.log(-1)
            }
        }
        let n, d
        n = this.ratio3.num
        d = this.ratio3.den
        if (this.ratio1.num != this.ratio2.den && this.ratio1.den != this.ratio2.den) {

            switch (true) {
                case (n < 0): {
                    n = -(this.ratio3.num)
                    this.RSub = {
                        num: -super.Fraction(n / d, true),
                        den: super.Fraction(n / d, false)
                    }
                } break
                case (d < 0): {
                    d = -(this.ratio3.den)
                    this.RSub = {
                        num: super.Fraction(n / d, true),
                        den: -super.Fraction(n / d, false)
                    }
                } break
                case (n < 0 && d < 0): {
                    n = -(this.ratio3.num)
                    d = -(this.ratio3.den)
                    this.RSub = {
                        num: -super.Fraction(n / d, true),
                        den: -super.Fraction(n / d, false)
                    }
                } break
                default: {
                    this.RSub = {
                        num: super.Fraction(n / d, true),
                        den: super.Fraction(n / d, false)
                    }
                }
            }
        }
        else if (this.ratio1.num == this.ratio2.num && this.ratio1.den == this.ratio2.den) {

            this.RSub = { num: n, den: d }
        }
    }

    protected Multiplication() {
        // x*y = x*y
        // q*z     q*z
        // note q and z !=0
        let num1Mnum2 = this.ratio1.num * this.ratio2.num
        let den1Mden2 = this.ratio1.den * this.ratio2.den
        let n, d
        n = num1Mnum2
        d = den1Mden2
        if (this.ratio1.num != this.ratio2.den && this.ratio1.den != this.ratio2.den) {
            switch (true) {
                case (n < 0): {
                    n = -(this.ratio3.num)
                    this.RMul = {
                        num: -super.Fraction(n / d, true),
                        den: super.Fraction(n / d, false)
                    }
                } break
                case (d < 0): {
                    d = -(this.ratio3.den)
                    this.RMul = {
                        num: super.Fraction(n / d, true),
                        den: -super.Fraction(n / d, false)
                    }
                } break
                case (n < 0 && d < 0): {
                    n = -(this.ratio3.num)
                    d = -(this.ratio3.den)
                    this.RMul = {
                        num: -super.Fraction(n / d, true),
                        den: -super.Fraction(n / d, false)
                    }
                } break
                default: {
                    this.RMul = {
                        num: super.Fraction(n / d, true),
                        den: super.Fraction(n / d, false)
                    }
                }
            }
        }
        else {
            this.RMul = { num: super.Fraction(n / d, true), den: super.Fraction(n / d) }
        }

    }

    protected Division() {
        // x/y = x/z
        // q/z     q/y
        // note q , y z !=0
        let num1Byden2 = this.ratio1.num * this.ratio2.den
        let den1Bynum2 = this.ratio1.den * this.ratio2.num
        this.RDiv = { num: num1Byden2, den: den1Bynum2 }


        if (this.ratio1.num == this.ratio2.num && this.ratio1.den == this.ratio2.den) {
            this.RDiv = { num: 1, den: 1 }
        }
    }

    // returns true if the denominator of the ratio's matches
    // note to send only denominator values only
    rEqualityTest(a: number, b: number) {
        let d = super.Fraction(a, false)
        let d2 = super.Fraction(b, false)
        let equalDeno = false
        if (d == d2)
            equalDeno = true
        return equalDeno
    }

    // personal use
    protected EqualityTest(a: number, b: number) {
        let equalDeno = false
        if (a == b)
            equalDeno = true
        return equalDeno
    }

    // a+b 
    private ratio1: fraction
    private ratio2: fraction
    // result of a+b
    private ratio3: fraction = { num: -1, den: -10 }
    // results of respective operations
    RAdd: fraction = { num: -1, den: -10 }
    RSub: fraction = { num: -1, den: -10 }
    RMul: fraction = { num: -1, den: -10 }
    RDiv: fraction = { num: -1, den: -10 }

}

// helping type for the rational number
type fraction = { num: number, den: number }

// /**
//  * fix: 125 then the output base: 5 and the pow 3
//  * base is given 25 and the pow is 3
//  * @param p: number to find power of
//  * @param baseNumber: if true then returns the base number 
//  * for example for 4 the base is 2
//  * @returns returns the power or baseNumber
//  * for example pass num is 8 then the power will be 3 and the base number will be 2
//  */
// function powerOn(p: number, baseNumber: boolean = false): number {
//     let x = NumberOfDivisors(p)
//     let pbase = 0 // a base is nothing but like a parent like 2 to the power 3 for the number 8
//     let rV = 0 // rV: return value
//     switch (true) {
//         case even(p): {
//             pbase = 2
//         } break
//         case odd(p): {
//             console.log('odd')
//             let refer = OddFactors(p, true)
//             let cg = []

//             let i = 0
//             // removing prime number
//             while (i < refer.length) {
//                 if (!primeNumber(refer[i])) {
//                     cg.push(refer[i])
//                 }
//                 i += 1
//             }
//             console.log('cg: ', cg)
//         } break

//         case primeNumber(p): {
//             pbase = x
//         } break
//     }
//     if (baseNumber) {
//         rV = pbase
//     } else {
//         rV = x
//     }
//     console.log('rv: ', rV, 'pbase: ', pbase, 'x: ', x)
//     console.log('pow: ', pbase ** x)
//     return rV
// }
// console.log(powerOn(999))
// console.log(primeNumber(111))

/**
 * separates the given number into an array of number
 * if passed 1234 then the given array at index 1=  1, index 2= 2, index 3= 3, index 4= 4 
 * @param n : int or double number
 * @returns separation of a single number
 */
function BubbleNumbers(n: number) {
    // 123 than 123/100=1.23 appr 1 now number 1*100(pv of number 123) =100 than 123-100=23 
    // then 23 / 10=2.3 appr 2 than 2 * 10(pv of 23)=20 
    // than 23 - 20=3 
    // hence number separated[1, 2, 3]

    const ten = 10
    let eq1 = 1 // equation 1
    let eq2 = 1
    let eq3 = 1
    let pv = 10
    let system = [] // for storing the separated numbers
    switch (true) {
        case (Number.isInteger(n)): {
            // working with separating int
            pv = countIntegeralZero(n, true)
            while (n != 0) {
                eq1 = Math.floor(n / pv)
                eq2 = eq1 * pv
                eq3 = n - eq2
                system.push(eq1)
                n = eq3
                pv /= 10
            }
        } break
        default: {
            // working with separating float or double
            pv = countDecimalZero(n, true)
            n = n * pv
            while (n != 0) {
                eq1 = Math.floor(n / pv)
                eq2 = eq1 * pv
                eq3 = n - eq2
                system.push(eq1)
                n = eq3
                pv /= 10
            }
        }
    }
    if (system[0] == 0) {
        // removing zero at index one
        //  suppose 0.123 then 0,1,2,3 number is stored where we dont need 0
        // we need the number 1 2 3 
        system.splice(0, 1)
    }
    return [...system]
}

/**
 * 
 * @param n: int or double
 * @returns sum of the number
 * for example 123 than 1+2+3=6
 */
function NumSum(n: number) {
    let sys = BubbleNumbers(n)
    let sum = 0
    for (let i = 0; i < sys.length; ++i) {
        sum += sys[i]
    }
    return sum
}


/**
 * 
 * @param numByden: a number in the form numerator by denominator
 * for example: 1/3 where num is 1 and den is 3
 * @returns true if it is recurring or repeating decimal number else false meaning it is not repeating number
 */
function RepeatingDecimalNumber(numByden: number) {
    let j = numByden
    let x = BubbleNumbers(j)
    let y = 0
    let z = 0
    // sum of first 5 index and sum of next 5 index 
    for (let i = 0; i < 6; ++i) {
        y += x[i]
    }
    for (let i = 0; i < 12; ++i) {
        if (i < 6) {
            z += x[i]
        }
    }
    if (y == z)
        return true
    else return false
}
