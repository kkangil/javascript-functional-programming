/**
 * 일급 함수
 */

function f1() { }
var a = typeof f1 === 'function' ? f1 : function () { };

function f2() {
  return function () { };
}

(function (a, b) { return a + b; })(10, 5);

function callAndAdd(a, b) {
  return a() + b();
}
callAndAdd(function () { return 10; }, function () { return 5; })

/**
 *  클로저
 */

function parent() {
  var a = 5;
  function myfn() {
    console.log(a);
  }
}

function parent2() {
  var a = 5;
  function parent1() {
    function myfn() {
      console.log(a);
    }
  }
}

var a = 10;
var b = 20;
function f1() {
  return a + b;
}

console.log(f1());

function f2() {
  var a = 10;
  var b = 20;
  function f3(c, d) {
    return c + d;
  }

  return f3;
}

// var f4 = f2();
// console.log(f4(5, 7));

function f4() {
  var a = 10;
  var b = 20;
  function f5() {
    return a + b;
  }

  return f5();
}

console.log(f4());

function f6() {
  var a = 10;
  function f7(b) {
    return a + b;
  }

  return f7;
}

var f8 = f6();
console.log(f8(20));
console.log(f8(10));

function f9() {
  var a = 10;
  var f10 = function (c) {
    return a + b + c;
  }
  var b = 20;
  return f10;
}

var f11 = f9();
console.log(f11(30));

/**
 * 고차 함수
 */

function callWith10(val, func) {
  return func(10, val);
}

function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

console.log(callWith10(20, add));
console.log(callWith10(5, sub));

function constant(val) {
  return function () {
    return val;
  }
}

var always10 = constant(10);
console.log(always10()); // 10
console.log(always10()); // 10
console.log(always10()); // 10

function callWith(val1) {
  return function (val2, func) {
    return func(val1, val2);
  }
}
var callWith10 = callWith(10);
console.log(callWith10(20, add)); // 30

var callWith5 = callWith(5);
console.log(callWith5(5, sub)); // 0

console.log(callWith(30)(20, add));
console.log(callWith(5)(5, sub));

var _ = {};
_.get = function (list, index) {
  return list[index];
}

var users = [
  { id: 2, name: "HA", age: 25 },
  { id: 4, name: "PJ", age: 28 },
  { id: 5, name: "JE", age: 27 },
];

var callWithUsers = callWith(users);
console.log(callWithUsers(2, _.get));

/**
 * 함수를 리턴하는 함수와 부분 적용
 */
function add(a, b) {
  return a + b;
}
var add10 = add.bind(null, 10);
console.log(add10(20)); // 30


// 존 레식
Function.prototype.partial = function () {
  var fn = this, args = Array.prototype.slice.call(arguments); // 1
  return function () { // 2
    var arg = 0;
    for (var i = 0; i < args.length && arg < arguments.length; i++) // 5
      if (args[i] === undefined) args[i] = arguments[arg++]; // 6

    return fn.apply(this, args);
  }
}

function abc(a, b, c) {
  console.log(a, b, c);
}

var ac = abc.partial(undefined, 'b', undefined); // 3 
ac('a', 'c'); // 4
// a, b, c

function add() {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}

console.log(add(1, 2, 3, 4, 5));

var add2 = add.partial(undefined, 2);
console.log(add2(1, 3, 4, 5)); // 3

var add3 = add.partial(undefined, undefined, 3, undefined, undefined);
console.log(add3(1, 2, 4, 5)); // 15

console.log(add3(50, 50, 50, 50)); // 15 (bug)
console.log(add3(100, 100, 100, 100)); // 15 (bug)

Function.prototype.partial = function () {
  var fn = this, _args = arguments;
  return function () {
    var args = Array.prototype.slice.call(_args);
    var arg = 0;
    for (var i = 0; i < args.length && arg < arguments.length; i++)
      if (args[i] === undefined) args[i] = arguments[arg++];

    return fn.apply(this, args);
  }
}