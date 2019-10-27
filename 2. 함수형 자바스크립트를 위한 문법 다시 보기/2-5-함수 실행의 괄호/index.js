/**
 * 함수를 실행하는 괄호
 */

var add5 = function (a) { // 새로운 공간
  return a + 5;
}

var call = function (f) { // 새로운 공간
  return f();
}

// 함수를 실행하는 괄호
add(5);
call(function () { return 10; });

/**
 * 기본적인 비동기 상황
 */

console.log(1);
setTimeout(function () {
  console.log(3)
}, 1000);
console.log(2);

// 1
// 2
// 3 (1초 뒤)

/**
 * 콜백함수로 결과 받기
 */

var add = function (a, b, callback) {
  setTimeout(function () {
    callback(a + b);
  }, 1000);
}

add(10, 5, function (r) {
  console.log(r);
})

/**
 * 비동기 제어
 */
var add = function (a, b, callback) {
  setTimeout(function () {
    callback(a + b);
  }, 1000);
}

var sub = function (a, b, callback) {
  setTimeout(function () {
    callback(a - b);
  }, 1000);
}

var div = function (a, b, callback) {
  setTimeout(function () {
    callback(a / b);
  }, 1000);
}

add(10, 15, function (a) {
  sub(a, 5, function (a) {
    div(a, 10, function (r) {
      console.log(r); // 약 3초 후에 2가 찍힘
    })
  })
})

console.log(div(sub(add(10, 15), 5), 10));
// undefined가 찍히고 callback이 없다는 에러가 남.

function wrap(func) { // 1. 함수 받기
  return function () { // 2. 함수 리턴하기, 이것이 실행됨.
    // 여기에 새로운 공간이 생김, 나중에 함수를 실행했을 때 이 부분을 거쳐감
    return func.apply(arguments); // 3
  }
}

var add = wrap(function (a, b, callback) {
  setTimeout(function () {
    callback(a + b);
  }, 1000);
});

add(5, 10, function (r) {
  console.log(r);
})

/**
 * 실행 이전의 공간에서 비동기 제어와 관련된 일 추가하기
 */

function _async(func) {
  return function () {
    arguments[arguments.length++] = function (result) { // 1
      _callback(result) // 6
    };

    func.apply(null, arguments); // 2

    var _callback; // 3
    function _async_cb_receiver(callback) { // 4
      _callback = callback; // 5
    }

    return _async_cb_receiver;
  }
}

var add = _async(function (a, b, callback) {
  setTimeout(function () {
    callback(a + b);
  }, 1000);
});

add(20, 30)(function (r) { // 7
  console.log(r);
})

/**
 * 인자를 넘기면서 실행하는 부분과 결과를 받는 부분 분리
 */

var add = _async(function (a, b, callback) {
  setTimeout(function () {
    callback(a + b);
  }, 1000);
});

var sub = _async(function (a, b, callback) {
  setTimeout(function () {
    callback(a - b);
  }, 1000);
});

var div = _async(function (a, b, callback) {
  setTimeout(function () {
    callback(a / b);
  }, 1000);
});

add(10, 15)(function (a) {
  sub(a, 5)(function (a) {
    div(a, 10)(function (r) {
      console.log(r);
      // 약 3초 후 2가 찍힘
    })
  })
})

/**
 * 비동기와 재귀
 */

function _async(func) {
  return function () {
    arguments[arguments.length++] = function (result) {
      _callback(result)
    };

    // 변경된 부분
    (function wait(args) {
      // 새로운 공간 추가
      for (var i = 0; i < args.length; i++) {
        if (args[i] && args[i].name === '_async_cb_receiver') {
          return args[i](function (arg) { args[i] = arg; wait(args) });
        }
      }
      func.apply(null, args);
    })(arguments);

    var _callback;
    function _async_cb_receiver(callback) {
      _callback = callback;
    }

    return _async_cb_receiver;
  }
}

var add = _async(function (a, b, callback) {
  setTimeout(function () {
    console.log('add', a, b);
    callback(a + b);
  }, 1000);
});

var sub = _async(function (a, b, callback) {
  setTimeout(function () {
    console.log('sub', a, b);
    callback(a - b);
  }, 1000);
});

var div = _async(function (a, b, callback) {
  setTimeout(function () {
    console.log('div', a, b);
    callback(a / b);
  }, 1000);
});

var log = _async(function (val) {
  setTimeout(function () {
    console.log(val);
  }, 1000)
})

log(div(sub(add(10, 15), 5), 10));
// 약 4초 뒤 2
log(add(add(10, 10), sub(10, 5)));
// 약 3초 뒤 25