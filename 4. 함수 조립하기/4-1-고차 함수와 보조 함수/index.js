

/**
 * _.once
 */

// var _ = {};

// _.once = function (func) {
//   var flag, result;
//   return function () {
//     if (flag) return result;
//     flag = true;
//     return result = func.apply(this, arguments);
//   }
// }

var hi = _.once(function () {
  console.log('hi');
})

hi();
// hi
hi();
// 아무일도 일어나지 않음

var a = _.once(function () {
  console.log('A');
  return 'B';
})

console.log(a());
// A
// B
console.log(a());
// B

/**
 * 다시 물어 보지 않는 함수
 */
function skip(body) {
  var yes;
  return function () {
    return yes || (yes = body.apply(null, arguments));
  }
}

/** 
 * id를 증가시키는 함수
 */

function idMaker(start) {
  return function () {
    return ++start;
  }
}

var messageCid = idMaker(0);
messageCid();
// 1
messageCid();
// 2

var postCid = idMaker(11);
postCid()
// 12
postCid()
// 13
