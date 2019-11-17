/**
 * Michael Fogus의 _.pipeline 
 */

_.pipeline = function () {
  var funs = arguments; // 1. 함수들

  return function (seed) { // 2. 첫 인자
    return _.reduce(funs,
      function (l, r) { return r(l); }, // 4. 모든 함수를 연속적으로 실행
      seed) // 3. 첫 인자 전달
  }
};

var div_square = _.pipeline(
  function (a) {
    return a / 2;
  },
  function (a) {
    return a * a;
  }
);

console.log(div_square(6));
// 9

/**
 * 개인 회원 가입과 기업 회원 가입
 */
var users = [];
var companies = [];

function joined_at(attrs) {
  return _.extend(attrs, { joined_at: new Date() })
}

function greeting(member) {
  return member.name + " 회원님은 " + member.id + " 번째 회원이십니다. 환영합니다.";
}

var join_user = _.pipeline(
  joined_at,
  function (member) {
    users.push(member);
    member.id = users.length;
    return member;
  },
  greeting
);

var join_company = _.pipeline(
  joined_at,
  function (member) {
    companies.push(member);
    member.id = companies.length;
    return member;
  },
  greeting
);

console.log(join_user({ name: "ID" }));
// ID 회원님은 1 번째 회원이십니다. 환영합니다.
console.log(join_user({ name: "JI" }));
// JI 회원님은 2 번째 회원이십니다. 환영합니다.
console.log(join_company({ name: "MARPPLE" }));
// MARPPLE 회원님은 1 번째 회원이십니다. 환영합니다.

/**
 * with partial
 */

var users = [];
var companies = [];

function joined_at(attrs) {
  return _.extend(attrs, { joined_at: new Date() })
}

function join(table, member) {
  table.push(member);
  member.id = table.length;
  return member;
}

function greeting(member) {
  return member.name + " 회원님은 " + member.id + " 번째 회원이십니다. 환영합니다.";
}

var join_user = _.pipeline(
  joined_at,
  _.partial(join, users),
  greeting
);

var join_company = _.pipeline(
  joined_at,
  _.partial(join, companies),
  greeting
);

console.log(join_user({ name: "ID" }));
// ID 회원님은 1 번째 회원이십니다. 환영합니다.
console.log(join_user({ name: "JI" }));
// JI 회원님은 2 번째 회원이십니다. 환영합니다.
console.log(join_company({ name: "MARPPLE" }));
// MARPPLE 회원님은 1 번째 회원이십니다. 환영합니다.

/**
 * Multiple Results
 */
_.mr = function () {
  arguments._mr = true; // 인자들이 담긴 arguments 객체에 _mr로 구분자를 만듬
  return arguments;
}

_.pipeline = function () {
  var funs = arguments;
  return function (seed) {
    return _.reduce(funs,
      function (l, r) {
        // Multiple Results라면 apply로 인자를 펼침.
        return l && l._mr ? r.apply(null, l) : r(l);
      },
      // 인자가 여러개면 첫 번째 함수에게도 Multiple Results로 만들어서 넘기기
      arguments.length < 2 ? seed : _.mr.apply(null, arguments)
    )
  }
};

/**
 * Multiple Results 사용
 */
function add(a, b) {
  return a + b;
}
function square(a) {
  return a * a;
}
function sub(a, b) {
  return a - b;
}

var f1 = _.pipeline(
  add,
  square,
  function (a) {
    return _.mr(a, a / 5); // Multiple Results
  },
  sub
);
console.log(f1(3, 2));
// 20