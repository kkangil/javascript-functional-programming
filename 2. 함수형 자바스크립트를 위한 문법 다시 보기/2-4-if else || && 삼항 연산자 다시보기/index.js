
/**
 * 이미 선언되어 있는 변수의 값 재할당
 */

var a;
if (a = 5) console.log(a); // 1

if (a = 0) console.log(1); // 2
else console.log(a);

if (!(a = false)) console.log(a); // 3

if (a = 5 - 5); // 4
else console.log(a)


/** */
var obj = {};

if (obj.a = 5) console.log(obj.a); // 1

if (obj.b = false) console.log(obj.b); // 2
else console.log('hi');

var c;
if (c = obj.c = true) console.log(c); // 3

/** */
function add(a, b) {
  return a + b;
}

if (add(1, 2)) console.log('hi1');

var a;
if (a = add(1, 2)) console.log(a);

if (function () { return true; }()) console.log('hi')

/**
 * || &&
 */

console.log(0 && 1) // 0
console.log(1 && 0) // 0
console.log([] || {}); // []
console.log([] && {}); // {}
console.log([] && {} || 0); // {}
console.log(0 || 0 || 0 || 1 || null); // 1
console.log(add(10, -10) || add(10, -10)); // 0
console.log(add(10, -10) || add(10, 10)); //20
var v;
console.log((v = add(10, -10)) || v++ && 20); // 0
console.log((v = add(10, 10)) || ++v && 20); // 20

/**
 * 삼항연산자
 */

var a = false;

var c = a ? 10 : function f(arr, v) {
  return arr.length ? f(arr, v + arr.shift()) : v;
}([1, 2, 3], 0);

console.log(c)
