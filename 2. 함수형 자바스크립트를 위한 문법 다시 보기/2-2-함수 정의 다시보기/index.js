/**
 * 일반적인 함수 정의
 */

// function add1(a, b) {
//   return a + b;
// }
// var add2 = function(a, b) {
//   return a + b;
// }
var m = {
  add3: function (a, b) {
    return a + b;
  }
}

/**
 * 에러가 나지만 호이스팅!
 */

// console.log(add1(10, 5)); // 15
// // add2(10, 5); // Uncaught TypeError: add2 is not a function

// function add1(a, b) {
//   return a + b;
// }
// var add2 = function (a, b) {
//   return a + b;
// }

/**
 * 실행하지 않고 참조만 해보기
 */

console.log(add1); // function add1(a, b) { return a + b };
console.log(add2); // undefined;

function add1(a, b) {
  return a + b;
}
var add2 = function (a, b) {
  return a + b;
}

/**
 * 호이스팅 활용
 */

function add(a, b) {
  return valid() ? a + b : new Error();

  function valid() {
    return Number.isInteger(a) && Number.isInteger(b);
  }
}

console.log(add(10, 5)); // 15
console.log(add(10, '')); // Error(...)

/**
 * 일반적인 즉시 실행 방식
 */

(function (a) {
  console.log(a);
})(100);

/**
 * 괄호 없이 즉시 실행
 */
function f1() {
  return function (a) {
    console.log(a)
  }(1)
}

f1();

/**
 * 괄호 없이 정의가 가능한 다양한 상황
 */

!function (a) {
  console.log(a)
}(1);

true && function (a) {
  console.log(a)
}(1);

1 ? function (a) {
  console.log(a)
}(1) : 5;

0, function (a) {
  console.log(a)
}(1);

var b = function (a) {
  console.log(a)
}(1);

function f2() { }
f2(function (a) {
  console.log(a)
}(1));

var f3 = function c(a) {
  console.log(a)
}(1);

new function () {
  console.log(1);
}

/**
 * 익명 함수에서 함수가 자신을 참조하는 법1
 */
var f1 = function () {
  console.log(f1);
}

f1();

// 위험 상황
var f2 = f1;
f1 = 'hi~';
f2();

/**
 * 익명 함수에서 함수가 자신을 참조하는 법2
 */

var f1 = function () {
  console.log(arguments.callee)
}

f1();
// ƒ () {
//   console.log(arguments.callee)
// }

var f2 = f1;
f1 = null;
f2();
// ƒ () {
//   console.log(arguments.callee)
// }

/**
 * 유명 함수의 자기 참조
 */

var f1 = function f() {
  console.log(f);
}
f1();

var f2 = f1;
f1 = null;
f2();

/**
 * 재귀를 이용한 flatten
 */

function flatten(arr) {
  return function f(arr, new_arr) { // 1
    arr.forEach(function (v) {
      Array.isArray(v) ? f(v, new_arr) : new_arr.push(v); // 2
    });

    return new_arr;
  }(arr, []); // 3
}

console.log(flatten([1, [2], [3, 4]]));
// [1,2,3,4]
console.log(flatten([1, [2], [[3], 4]]));
// [1,2,3,4]

/**
 * 즉시 실행 + 유명 함수 기법이 아닌 경우
 */

function flatten2(arr, new_arr) {
  arr.forEach(function (v) {
    Array.isArray(v) ? flatten2(v, new_arr) : new_arr.push(v);
  });

  return new_arr;
}

flatten2([1, [2], [3, 4]], []) // 항상 빈 Array를 추가로 넘겨 줘야함.

function flatten3(arr, new_arr) {
  if (!new_arr) return flatten3(arr, []); // if 문이 생김
  arr.forEach(function (v) {
    Array.isArray(v) ? flatten3(v, new_arr) : new_arr.push(v);
  });

  return new_arr;
}