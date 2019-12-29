/**
 * 자신의 상태를 변경하는 메서드 sort
 */
var users1 = [
  { name: "ID", age: 32 },
  { name: "HA", age: 25 },
  { name: "BJ", age: 32 },
  { name: "PJ", age: 28 },
  { name: "JE", age: 27 },
];

var comparator = function (a, b) {
  if (a.age < b.age) return -1;
  if (a.age > b.age) return 1;
  return 0;
};

var sortedUsers1 = users1.sort(comparator) // 1

console.log(users1 === sortedUsers1) // 2 true

console.log(_.pluck(sortedUsers1, 'age')); // 3 [25, 27, 28, 32, 32]

console.log(_.pluck(users1, 'age')); // 4 [25, 27, 28, 32, 32]

/**
 * 정렬된 새로운 값을 만드는 _.sortBy
 */

var users2 = [
  { name: "ID", age: 32 },
  { name: "HA", age: 25 },
  { name: "BJ", age: 32 },
  { name: "PJ", age: 28 },
  { name: "JE", age: 27 },
];

var sortedUsers2 = _.sortBy(users2, 'age') // 1

console.log(users2 === sortedUsers2) // 2 false

console.log(_.pluck(sortedUsers2, 'age')) // 3 [25, 27, 28, 32, 32]

console.log(_.pluck(users2, 'age')) // 4 [32, 25, 32, 28, 27]

console.log(users2[1] === sortedUsers2[0]); // 5 true

/**
 * _.reject
 */

var rejectedUsers2 = _.reject(users2, function (user) { return user.age < 30; });
console.log(rejectedUsers2);
// [{name: "ID", age: 32}, {name: "BJ", age: 32}]

console.log(rejectedUsers2 === users2) // false
console.log(rejectedUsers2.length, users2.length); // 2 5 
console.log(rejectedUsers2[0] === users2[0]) // true

/**
 * _.reject, _.pluck
 */
//  1
console.log(
  _.pluck(_.reject(users2, function (user) { return user.age >= 30; }), 'name')
)
// ["HA", "PJ", "JE"]

// 2
console.log(
  _.pluck(users2, 'name')
)
// ["ID", "HA", "BJ", "PJ", "JE"]

// 3
console.log(users2)
// 원본 그대로

/**
 * _.initial, _.without
 */

var b1 = [1, 2, 3, 4, 5];
var b2 = _.initial(b1, 2); // 뒤에서 2개 제거한 새로운 배열 리턴
console.log(b1 === b2, b1, b2);
// false (5) [1, 2, 3, 4, 5] (3) [1, 2, 3]

var b3 = _.without(b1, 1, 5); // 1과 5를 제거한 새로운 배열 리턴
var b4 = _.without(b3, 2); // 2를 제거한 새로운 배열 리턴
console.log(b1 === b3, b3 === b4, b3, b4);
// false false (3) [2, 3, 4] (2) [3, 4]

/**
 * _.clone
 */

var product1 = {
  name: "AB 반팔티",
  price: 10000,
  sizes: ["M", "L", "XL"],
  colors: ["Black", "White", "Blue"]
};

var product2 = _.clone(product1);
console.log(product2);
// {
//   name: "AB 반팔티",
//   price: 10000,
//   sizes: ["M", "L", "XL"],
//   colors: ["Black", "White", "Blue"]
// }

console.log(product1 === product2); // false

product2.name = "ABCD 반팔티";
console.log(product1.name, product2.name);
// AB 반팔티 ABCD 반팔티

/**
 * 객체 내부의 객체는 복사하지 않는 _.clone
 */

product2.sizes.push("2XL");
console.log(product2.sizes);
// ["M", "L", "XL", "2XL"]
console.log(product1.sizes);
// ["M", "L", "XL", "2XL"]
console.log(product1.sizes === product2.sizes); // true

/**
 * _.clone 구현해보기
 */

_.clone = function (obj) {
  var cloned = _.isArray(obj) ? [] : {};
  var keys = _.keys(obj);
  _.each(keys, function (key) {
    cloned[key] = obj[key]; // Array일때는 key가 숫자
  });
  return cloned;
}

var obj1 = { a: 1, b: 2, c: { d: 3 } };
var obj2 = _.clone(obj1);
obj2.b = 22;

console.log(obj2);
// { a: 1, b: 22, c: { d: 3 } };
console.log(obj1);
// { a: 1, b: 2, c: { d: 3 } };

console.log(obj1 === obj2); // false
console.log(obj1.c === obj2.c); // true

obj2.c.d = 33;
console.log(obj1.c.d) // 33 obj1도 같이 변경

/**
 * 깊은 값 원본에 영향 주지 않고 변경하기
 */

var product1 = {
  name: "AB 반팔티",
  price: 10000,
  sizes: ["M", "L", "XL"],
  colors: ["Black", "White", "Blue"]
};

var product2 = _.clone(product1);
product2.sizes = _.clone(product2.sizes); // 내부도 clone 후 push를 하거나
product2.sizes.push("2XL")
console.log(product2.sizes);
// ["M", "L", "XL", "2XL"]
console.log(product1.sizes);
// ["M", "L", "XL"]
console.log(product1.sizes === product2.sizes); // false

product2.colors = product2.colors.concat("Yellow") // 아니면 concat으로 한번에
console.log(product2.colors);
// ["Black", "White", "Blue", "Yellow"]
console.log(product1.colors);
// ["Black", "White", "Blue"]
console.log(product1.colors === product2.colors); // false

/**
 * _.extend, _.defaults
 */

var product1 = {
  name: "AB 반팔티",
  price: 10000,
  sizes: ["M", "L", "XL"],
  colors: ["Black", "White", "Blue"]
};

// 1
var product2 = _.extend({}, product1, {
  name: "AB 긴팔티",
  price: 15000
});

// 2
var product3 = _.defaults({
  name: "AB 후드티",
  price: 12000
}, product1);

console.log(product2);
// {
//   name: "AB 긴팔티",
//   price: 15000,
//   sizes: ["M", "L", "XL"],
//   colors: ["Black", "White", "Blue"]
// };
console.log(product3);
// {
//   name: "AB 후드티",
//   price: 12000,
//   sizes: ["M", "L", "XL"],
//   colors: ["Black", "White", "Blue"]
// };

var product4 = _.extend({}, product3, {
  colors: product3.colors.concat("Purple")
});
var product5 = _.defaults({
  colors: product4.colors.concat("Red")
}, product4);

console.log(product3.colors);
// ["Black", "White", "Blue"]
console.log(product4.colors);
// ["Black", "White", "Blue", "Purple"]
console.log(product5.colors);
// ["Black", "White", "Blue", "Purple", "Red"]