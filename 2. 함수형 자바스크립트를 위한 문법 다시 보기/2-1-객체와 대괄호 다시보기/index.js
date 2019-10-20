/**
 * 다양한 key/value 정의 방법
 */

var obj = { a: 1, "b": 2 };
obj.c = 3;
obj['d'] = 4;
var e = 'e';
obj[e] = 5;
function f() { return 'f' };
obj[f()] = 6;
console.log(obj);

/**
 * 띄어쓰기, 특수 문자, 숫자
 */
var obj2 = { "a a a": 1 };
obj2["b b b"] = 2;
console.log(obj2);

var obj3 = { "margin-top": 5 };
obj3["padding-bottom"] = 20;
console.log(obj3);

var obj4 = { 1: 10 };
obj4[2] = 20;
console.log(obj4);

/**
 * 코드 실행
 */
// var obj5 = { (true ? "a" : "b"): 1}; // Uncaught SyntaxError
var obj6 = {};
obj6[true ? "a" : "b"] = 1;
console.log(obj6);

/**
 * ES6에서 동작하는 {} 안쪽에 대괄호 사용하기
 */
var obj5 = { [true ? "a" : "b"]: 1 }
console.log(obj5);

/**
 * 함수나 배열에 달기
 */

function obj8() { }
obj8.a = 1;
obj8.b = 2;
console.log(obj8.a); // 1
console.log(obj8.b); // 2

var obj10 = []
obj10.a = 1;
console.log(obj10.a); // 1
console.log(obj10.length); // 0

var obj11 = [];
obj11[0] = 1;
obj11[1] = 2;
console.log(obj11);
console.log(obj11.length) // 2

/**
 * 기본 객체의 메서드 지우기
 */

var obj = { a: 1, b: 2, c: 3 };
delete obj.a;
delete obj['b'];
delete obj['C'.toLocaleLowerCase()];
console.log(obj) // {}

delete Array.prototype.push;
var arr1 = [1, 2, 3];
arr1.push(4); // Uncaught TypeError: arr1.push is not a function