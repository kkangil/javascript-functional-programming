/**
 * 인자 , this, arguments 출력
 */

function test(a, b, c) {
  console.log('a b c:', a, b, c);
  console.log(this);
  console.log(arguments);
}

test(10); // 1
// a b c: 10 undefined undefined
// this: Window {...}
// arguments: [10]

test(10, undefined); // 2
// a b c: 10 undefined undefined
// this: Window {...}
// arguments: [10, undefined]

test(10, 20, 30); // 3
// a b c: 10 20 30
// this: Window {...}
// arguments: [10, 20, 30]


/**
 * arguments...?
 */

function test2(a, b) {
  b = 10;
  console.log(arguments);
}

test2(1); // 1
// [1]
test2(1, 2) // 2
// [1, 10]

/**
 * 메서드로 만들기
 */

var o1 = { name: "obj1" };
o1.test = test;
o1.test(3, 2, 1);
// a b c: 3 2 1
// this: Object {name: "obj1", test: f}
// arguments: [3,2,1]

var a1 = [1, 2, 3];
a1.test = test;
a1.test(3, 3, 3);
// a b c: 3 3 3
// this: Array [1, 2, 3, test: f]
// arguments: [3,3,3]

var o1_test = o1.test;
o1_test(5, 6, 7);
// a b c: 5 6 7
// this: Window {...}
// arguments: [5, 6, 7]

(a1.test)(8, 9, 10);
// a b c: 8 9 10
// this: Array [1, 2, 3, test: f]
// arguments: [8, 9, 10]

a1['test'](8, 9, 10);
// a b c: 8 9 10
// this: Array [1, 2, 3, test: f]
// arguments: [8, 9, 10]

/**
 * call, apply
 */

test.call(undefined, 1, 2, 3);
test.call(null, 1, 2, 3);
test.call(void 0, 1, 2, 3);

test.call(o1, 3, 2, 1);
// a b c: 3 2 1
// this: Object {name: "obj1", test: f}
// arguments: [3,2,1]
test.call(1000, 3, 2, 1);
// a b c: 3 2 1
// this: Number {1000}
// arguments: [3,2,1]

o1.test.call(undefined, 3, 2, 1);
// a b c: 3 2 1
// this: Window {...}
// arguments: [3,2,1]
o1.test.call([50], 3, 2, 1);
// a b c: 3 2 1
// this: Array [50]
// arguments: [3,2,1]

test.apply(o1, [3, 2, 1]);
// a b c: 3 2 1
// this: Object {name: "obj1", test: f}
// arguments: [3,2,1]
test.apply(1000, [3, 2, 1]);
// a b c: 3 2 1
// this: Number {1000}
// arguments: [3,2,1]
o1.test.apply(undefined, [3, 2, 1]);
// a b c: 3 2 1
// this: Window {...}
// arguments: [3,2,1]
o1.test.apply([50], [3, 2, 1])
// a b c: 3 2 1
// this: Array [50]
// arguments: [3,2,1]

test.apply(o1, { 0: 3, 1: 2, 2: 1, length: 3 });
// a b c: 3 2 1
// this: Object {name: "obj1", test: f}
// arguments: [3,2,1]

(function () {
  test.apply(1000, arguments)
})(3, 2, 1);
// a b c: 3 2 1
// this: Number {1000}
// arguments: [3,2,1]

/**
 * 네이티브 코드 활용하기
 */

var slice = Array.prototype.slice;
function toArray(data) {
  return slice.call(data);
}

function rest(data, n) {
  return slice.call(data, n || 1);
}

var arr1 = toArray({ 0: 1, 1: 2, length: 2 });
arr1.push(3);
console.log(arr1);
// [1,2,3]

rest([1, 2, 3]);
// [2, 3]
rest([1, 2, 3], 2);
// [3]