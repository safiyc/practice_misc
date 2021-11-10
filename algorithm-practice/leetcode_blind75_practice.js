var twoSum = function (nums, target) {
  // given an arr of integers, find 2 indices that add up to target
  // 2 indices cannot be the same index
  // return the 2 indices as an arr

  // loop thru nums and loop thru nested nums, skipping nums[nestedInd] === num[outerInd]
  // go thru the loops to find sum equals to target and return the indices
  // each input is assumed to return exactly 1 solution (2 indices adding up to target)


  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i === j) {
        break;
      }

      if (nums[i] + nums[j] === target) {
        console.log([j, i]);
      }
    }
  }
};

// test cases
// twoSum([2, 7, 11, 15], 9); // [1,0]
// twoSum([2, 6, 11, 7, 15], 9); // [3,0]
// twoSum([2, 6], 9); // nothing is logged


// ################################


// using arrays here, and linked lists in leetcode
// leetcode submission doesn't work; dont know enough about linkedlist to solve atm
var addTwoNumbers = function (l1, l2) {
  // given 2 linked lists, each containing an arr of non-neg integers
  // the integers are stored in reverse order and each node/index contains a single digit
  // add the numbers and return the sum in a linked list
  // if a sum is more than a single digit, then return the rightmost digit and pass the digits
  // left of said right digit to include the left digits in the next sum

  // example:
  // input l1 = [2,4,3], l2 = [5,6,7]
  // output [7,0,8]

  // loop in reverse thru the first linked list and loop in reverse thru the 2nd linked list as
  // a nested loop of the first list
  // return a linked list of the sums

  // convert linked list l1, l2 to arrays; grabbed from stackoverflow
  // let arrl1 = [l1.val];
  // while (l1.next !== null) {
  //   l1 = l1.next;
  //   arrl1.push(l1.val);
  // }

  // let arrl2 = [l2.val];
  // while (l2.next !== null) {
  //   l2 = l2.next;
  //   arrl2.push(l2.val);
  // }

  let longArr = [];
  let shortArr = [];
  let i;
  let j;

  // i outer loop should always be bigger num than j inner loop (i.e. j is longer in length)
  if (l1.length >= l2.length) {
    i = l1.length - 1;  // bigger than j
    j = l2.length - 1;
    longArr = l1;
    shortArr = l2;
    // longArr = arrl1;
    // shortArr = arrl2;
  } else if (l1.length < l2.length) {
    i = l2.length - 1;  // bigger than j
    j = l1.length - 1;
    longArr = l1;
    shortArr = l2;
    // longArr = arrl2;
    // shortArr = arrl1;
  }

  let carryOver = 0;
  let result = [];

  for (i = 0; i < longArr.length; i++) {
    for (j = i; j < longArr.length;) {
      console.log('i - ', i, ' j - ', j);

      let sum;
      let keep;

      if (shortArr[j] === undefined) {
        sum = longArr[i] + 0 + carryOver;
        console.log('what is sum...', sum, ' longArr - ', longArr, ' shortArr - ', shortArr, ' carryOver - ', carryOver);
      } else {
        sum = longArr[i] + shortArr[j] + carryOver;  // sum will either be one digit or 2 bc test cases assume each longArr/li2 index is a single digit
        console.log('what is sum...', sum, ' longArr - ', longArr, ' shortArr - ', shortArr, ' carryOver - ', carryOver);
      }

      if (sum.toString().length > 1) {
        keep = parseInt(sum.toString().charAt(1));  // right most digit
        carryOver = parseInt(sum.toString().charAt(0));  // left most digit

        console.log('keep - ', keep, ' carryOver - ', carryOver);

        result.push(keep);
      } else {
        carryOver = 0;
        result.push(sum);
      }
      break;
    }
  }

  if (carryOver != 0) {
    result.push(carryOver);
  }


  return result;

  // convert array to linkedList; grabbed this from stackoverflow
  // function ListNode(val, next) {
  //   this.val = (val === undefined ? 0 : val)
  //   this.next = (next === undefined ? null : next)
  // }

  // let linkedList = result.reduce((acc, curr) => new ListNode(curr, acc), null);

  // return linkedList;
};

console.log(
  addTwoNumbers([2, 4, 3], [5, 6, 4])
);  // [7,0,8]

console.log(
  addTwoNumbers([0], [0])
);  // [0]

console.log(
  addTwoNumbers([9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9])
);  // [8,9,9,9,0,0,0,1]