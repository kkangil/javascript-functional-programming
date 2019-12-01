/**
 * _.go
 */

_.go(10, // 첫번째 인자
  function (a) { return a * 10 }, // 100
  function (a) { return a - 50 }, // 50
  function (a) { return a + 10 } // 60
)

/**
 * _.mr로 여러 개의 인자 넘기기
 */

_.go(10,
  function (a) { return _.mr(a * 10, 50) },
  function (a, b) { return a - b },
  function (a) { return a + 10 }
)
// 60


/**
 * 시작 인자로 _.mr을 사용
 */
_.go(_.mr(2, 3),
  function (a, b) {
    return a + b;
  },
  function (a) {
    return a * a
  }
)

/**
 * 읽기 좋은 _.go
 */

function add(a, b) {
  return a + b;
}
function square(a) {
  return a * a;
}

_.go(_.mr(2, 3), add, square);
_.go(_.mr(2, 3), (a, b) => a + b, a => a * a)

/**
 * _.pipe
 */

var f1 = _.pipe(add, square);
f1(2, 3); // 25

var f2 = _.pipe((a, b) => a + b, a => a * a);
f2(2, 3) // 25

/**
 * 부분 커링 지원
 */

var products = [
  { id: 1, name: "후드 집업", discounted_price: 6000, price: 10000 },
  { id: 2, name: "코잼 후드티", discounted_price: 8000, price: 8000 },
  { id: 3, name: "A1 반팔티", discounted_price: 6000, price: 6000 },
  { id: 4, name: "코잼 반팔티", discounted_price: 5000, price: 6000 },
]

_.go(products,
  _.filter(p => p.discounted_price < p.price), // 1
  _.sortBy('discounted_price'), // 2
  _.first, // 3
  _.val('name') // 4
)

// 코잼 반팔티

/**
 * _.go를 통한 조합
 */

// 할인이 없는 상품 중 가격이 낮은 상품의 id
_.go(products,
  _.reject(p => p.discounted_price < p.price),
  _.sortBy('discounted_price'),
  _.first,
  _.val('id'),
  console.log
)
// 3

// 할인 상품 중 가격이 가장 높은 상품의 이름
_.go(products,
  _.filter(p => p.discounted_price < p.price),
  _.sortBy('discounted_price'),
  _.last,
  _.val('name'),
  console.log
)
// 후드 집업

// 할인 상품 중 할인액이 가장 높은 상품의 이름
_.go(
  products,
  _.filter(p => p.discounted_price < p.price),
  _.sortBy(p => p.discounted_price - p.price),
  _.first,
  _.val('name'),
  console.log
)
// 후드 집업

// 할인 상품 중 할인액이 가장 낮은 상품의 이름
_.go(
  products,
  _.filter(p => p.discounted_price < p.price),
  _.max(p => p.discounted_price - p.price),
  _.val('name'),
  console.log
)
// 코잼 반팔티

/**
 * 파이프라인으로 보조 함수 만들기
 */

_.go(
  products,
  _.filter(p => p.discounted_price < p.price),
  _.map(_.pipe(_.identity, _.pick(['id', 'name']), _.values)),
  console.log
)
// [[1, "후드 집업"], [4, "코잼 반팔티"]]

/**
 * _.go의 비동기 함수 제어
 */

_.go(
  10,
  _.callback(function (a, next) {
    setTimeout(function () {
      next(a + 10)
    }, 100)
  }),
  function (a) { // next를 통해 받은 결과 a
    console.log(a);
  }
)

/**
 * _.callback에 여러 개의 비동기 함수 넘기기
 */

function asyncCallback() {
  function add(a, b, next) {
    setTimeout(function () {
      next(a + b);
    }, 1000);
  }

  function sub(a, b, next) {
    setTimeout(function () {
      next(a - b);
    }, 1000);
  }

  function mul(a, b, next) {
    setTimeout(function () {
      next(a * b);
    }, 1000);
  }

  function log(msg, next) {
    setTimeout(function () {
      console.log(msg);
      next(msg);
    }, 1000);
  }

  _.go(
    _.mr(5, 10),
    _.callback(
      function (a, b, next) {
        add(a, b, next);
      },
      function (result, next) {
        sub(result, 10, next);
      },
      function (result, next) {
        mul(result, 10, next);
      },
      function (result, next) {
        log(result, next);
      }
    )
  )
}

asyncCallback();

/**
 * _.callback으로 미리 지정해두기
 */

var add = _.callback(function (a, b, next) {
  setTimeout(function () {
    next(a + b);
  }, 1000);
});

var sub = _.callback(function (a, b, next) {
  setTimeout(function () {
    next(a - b);
  }, 1000);
});

var mul = _.callback(function (a, b, next) {
  setTimeout(function () {
    next(a * b);
  }, 1000);
});

var log = _.callback(function (msg, next) {
  setTimeout(function () {
    console.log(msg);
    next(msg);
  }, 1000);
});

_.go(
  _.mr(5, 10),
  add,
  function (result) {
    return sub(result, 10);
  },
  function (result) {
    return mul(result, 100);
  },
  function (result) {
    return log(result);
  }
)

/**
 * 파이프라인 나가기
 */

_.go(
  null,
  function () { console.log(1) },
  function () { console.log(2) },
  function () { return _.stop() },
  function () { console.log(3) }
)

var result = _.go(
  null,
  function () { console.log(1) },
  function () { console.log(2) },
  function () { return _.stop("Hi") },
  function () { console.log(3) }
);

console.log(result); // Hi