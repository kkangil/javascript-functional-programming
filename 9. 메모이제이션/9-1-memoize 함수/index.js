/**
 * memoization
 */

function memoize(func) {
  var cache = {};
  return function (arg) {
    if (cache[arg]) { // 이미 동일한 인자에 대한 결과가 있으면 리턴
      console.log('캐시로 결과 바로 리턴', arg);
      return cache[arg];
    }

    console.log('본체 실행', arg);
    // 받아둔 함수를 실행하면서 결과를 cache에 남겨둠
    return cache[arg] = func.apply(this, arguments);
  }
}

var mult5 = memoize(function (a) {
  return a * 5;
})

console.log(mult5(1));
// 본체 실행 1 -> 5
console.log(mult5(2));
// 본체 실행 2 -> 10
console.log(mult5(1));
// 캐시로 결과 바로 리턴 1 -> 5
console.log(mult5(2));
// 캐시로 결과 바로 리턴 2 -> 10


/**
 * memoize의 한계
 */

var add = memoize(function (a, b) {
  return a + b;
})

console.log(add(3, 5)); // 본체 실행 3 -> 8
console.log(add(3, 10)); // 캐시로 결과 바로 리턴 8 캐시가 동작했지만 3에만 의존하기 때문

var keys = memoize(function (obj) {
  return _.keys(obj);
});

console.log(keys({ a: 1, b: 2 }));
// 본체 실행 Object {a: 1, b: 2} -> ['a','b']
console.log(keys({ a: 1, b: 2 }));
// 캐시로 결과 바로 리턴 Object {a: 1, b: 2} -> ['a','b']
console.log(keys({ a: 10, b: 20 }));
// 잘 동작하는 듯 했지만 cache가 {[object Object]: ...} 이런 식으로 되기 때문에 오류

/**
 * _.memoize2
 */

var f1 = _.memoize2(function (obj) {
  console.log('함수 본체에 들어옴');
  return obj.a + 10;
});

var obj1 = { a: 1 };
var obj2 = { a: 2 };

console.log(f1(obj1));
// 함수 본체에 들어옴 11
console.log(f1(obj1));
// 캐시 사용
console.log(f1(obj2));
// 함수 본체에 들어옴 12
console.log(f1(obj2));
// 캐시 사용

/**
 * mutable
 */

var evens = _.memoize2(function (list) {
  console.log('함수 본체에 들어와서 loop 실행');
  return _.filter(list, function (num) {
    return num % 2 === 0;
  })
});

var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(evens(list)); // [2,4,6,8,10]
console.log(evens(list)); // [2,4,6,8,10] (캐시를 사용하여 loop를 돌지 않음)

list.push(11);
list.push(12);
console.log(list); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

console.log(evens(list)); // 캐시가 사용되어 12가 나오지 않음.

/**
 * immutable
 */

var list2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(evens(list2)); // [2,4,6,8,10]
console.log(evens(list2)); // [2,4,6,8,10] (캐시를 사용하여 loop를 돌지 않음)

list2 = list2.concat(11, 12);
console.log(list2); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

console.log(evens(list2)); // [2,4,6,8,10, 12]
console.log(evens(list2)); // [2,4,6,8,10, 12] (캐시를 사용하여 loop를 돌지 않음)
