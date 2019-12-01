/**
 * _.map
 */

// 1
console.log(JSON.stringify(_.map([1, 2, 3], function (v) {
  return new Date();
})))

//  ["2019-12-01T08:20:00.422Z","2019-12-01T08:20:00.422Z","2019-12-01T08:20:00.422Z"]

// 2
_.map([1, 2, 3], function () {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(new Date())
    }, 1000);
  });
}).then(function (result) {
  console.log(JSON.stringify(result))
})
// ["2019-12-01T08:20:01.424Z","2019-12-01T08:20:02.424Z","2019-12-01T08:20:03.428Z"]

/**
 * 파이프라인으로 동기와 비동기 코드 동일한 구조 만들기
 */

// 1
_.go(
  [1, 2, 3],
  _.map(function () { return new Date() }),
  JSON.stringify,
  console.log
);

// 2
_.go(
  [1, 2, 3],
  _.map(function () {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(new Date())
      }, 1000);
    });
  }),
  JSON.stringify,
  console.log
)

/**
 * 일반 콜백 함수를 _.map의 iteratee로 사용
 */

_.go(
  [1, 2, 3],
  _.map(_.callback(function (val, i, list, next) {
    setTimeout(function () {
      next(new Date());
    }, 1000)
  })),
  JSON.stringify,
  console.log
)

/**
 * _.if
 */

var is_1 = function (a) {
  return a === 1;
};
var is_2 = function (a) {
  return a === 2;
};

function test1(a) {
  if (is_1(a)) return '1입니다.'
  else if (is_2(a)) return '2입니다.'
  else return '1도 아니고 2도 아닙니다.'
}

console.log(test1(2)); // 2입니다.

/**
 * 비동기 함수와 조건문
 */
var is_1_async = function (a) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(a === 1);
    }, 1000);
  })
};

var is_2_async = function (a) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(a === 2);
    }, 1000);
  })
};

function test2(a) {
  if (is_1_async(a)) return '1입니다.'
  else if (is_2_async(a)) return '2입니다.'
  else return '1도 아니고 2도 아닙니다.'
};

console.log(test2(2)); // 1입니다. (정상적으로 동작하지 않음)

/**
 * _.if().else_if().else();
 */

var test4 =
  _.if(is_1_async, function () { return '1입니다.' })
    .else_if(is_2_async, function () { return '2입니다.' })
    .else(function () { return '1도 아니고 2도 아닙니다. ' });

test4(2).then(console.log); // 2입니다.

/**
 * _if, _.constant, _.go
 */

// _.constant
var test5 =
  _.if(is_1_async, _.constant('1입니다.'))
    .else_if(is_2_async, _.constant('2입니다.'))
    .else(_.constant('1도 아니고 2도 아닙니다. '));

test5(2).then(console.log);

// 화살표함수
var test6 =
  _.if(is_1_async, () => '1입니다.')
    .else_if(is_2_async, () => '2입니다.')
    .else(() => '1도 아니고 2도 아닙니다. ');
test6(1).then(console.log)

// _.go
_.go(
  3,
  _.if(is_1_async, _.constant('1입니다.'))
    .else_if(is_2_async, _.constant('2입니다.'))
    .else(_.constant('1도 아니고 2도 아닙니다. ')),
  console.log
)
