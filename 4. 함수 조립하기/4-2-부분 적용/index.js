/**
 * _.partial
 */
var pc = _.partial(console.log, 1);
pc(2);
// 2가 오른쪽으로 들어감
pc(2, 3);
// 2, 3이 오른쪽으로 들어감

var pc = _.partial(console.log, _, 2);
pc(1);
// 1, 2 1이 왼쪽의 _ 자리에 들어감
pc(1, 3);
// 1 2 3  1이 왼쪽의 _자리에 들어가고 3이 오른쪽으로 들어감

var pc = _.partial(console.log, _, _, 3);
pc(1);
// 1 undefined 3 1이 왼쪽 _ 자리에 들어가고 두 번째 _는 들어오지 않아 undefined 가 됨
pc(1, 2);
// 1 2 3 1과 2가 순서대로 _, _ 를 채움
pc(1, 2, 4);
// 1 2 3 4 1과 2가 순서대로 _, _를 채우고 3의 오른쪽으로 4가 들어감

var pc = _.partial(console.log, _, 2, _, _, 5);
pc(1, 3, 4, 6)
// 1 2 3 4 5 6

/**
 * add_all
 */

var add_all = _.partial(_.reduce, _, function (a, b) { return a + b });
console.log(add_all([1, 2, 3, 4]));
// 10
console.log(add_all([5, 2]));
// 7

/**
 *  method
 */

var method = function (obj, method) {
  return obj[method].apply(obj, _.rest(arguments, 2));
}

var push = _.partial(method, _, 'push');
var shift = _.partial(method, _, 'shift');

var a = [1, 2];
push(a, 3);
console.log(a);

shift(a);
console.log(a);

var b = method([1, 2, 3], 'concat', 4, 5);
console.log(b);

/**
 * compose
 */

_.compose(console.log, function (a) { return a - 2 }, function (a) { return a + 5 })(0);
// console.log <- 5 - 2 <- 0 + 5 <- 0

var falsy_values = _.compose(
  _.partial(_.isEqual, -1), // 1
  _.partial(_.findIndex, _, _.identity) // 2
);

console.log(falsy_values([1, true, {}]));
// false
console.log(falsy_values([0, 1, false]));
// false
console.log(falsy_values([0, "", false]));
// true

var some = _.negate(falsy_values); // 3
console.log(some([1, true, {}]));
// true
console.log(some([0, 1, false]));
// true
console.log(some(0, "", false));
// false

var every = _.compose(
  _.partial(_.isEqual, -1),
  _.partial(_.findIndex, _, _.negate(_.identity)) // 4
);

console.log(every([1, true, {}]));
// true
console.log(every([0, 1, false]));
// false
console.log(every([0, "", false]));
// false


/**
 * 아쉬운 partial
 */

function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function m() {
  var iter = arguments[arguments.length - 1];
  arguments.length--;
  return _.reduce(arguments, iter);
}

m(100, 50, add);
// 150
m(100, 50, 10, add);
// 160
m(100, 50, sub);
// 50
m(100, 50, 10, sub);
// 40

var f1 = _.partial(m, _, _, _, add);
// f1 은 3개의 인자만 더할 수 있다.
f1(1, 1, 1);
// 3
f1(1, 1);
// NaN
// f1(1, 1, 1, 1);
// _.reduce에 1이 넘어가면서 에러

/**
 * 새로운 partial
 */
var ___ = {};
_.partial = function (fn) {
  var args1 = [], args3, len = arguments.length, ___idx = len;
  for (var i = 1; i < len; i++) {
    var arg = arguments[i];
    if (arg == ___ && (___idx = i) && (args3 = [])) continue;
    if (i < ___idx) args1.push(arg);
    else args3.push(arg);
  }
  return function () { return fn.apply(this, mergeArgs(args1, arguments, args3)) };
};

function _toUndef(args1, args2, args3) {
  if (args2) args1 = args1.concat(args2);
  if (args3) args1 = args1.concat(args3);
  for (var i = 0, len = args1.length; i < len; i++)
    if (args1[i] == _) args1[i] = undefined;
  return args1;
}

function mergeArgs(args1, args2, args3) {
  if (!args2.length) return args3 ? _toUndef(args1, args3) : _toUndef(args1.slice());

  var n_args1 = args1.slice(), args2 = _.toArray(args2), i = -1, len = n_args1.length;
  while (++i < len) if (n_args1[i] == _) n_args1[i] = args2.shift();
  if (!args3) return _toUndef(n_args1, args2.length ? args2 : undefined);

  var n_arg3 = args3.slice(), i = n_arg3.length;
  while (i--) if (n_arg3[i] == _) n_arg3[i] = args2.pop();
  return args2.length ? _toUndef(n_args1, args2, n_arg3) : _toUndef(n_args1, n_arg3);
}

var pc = _.partial(console.log, ___, 2, 3);
pc(1);
// 1 2 3
pc(1, 4, 5, 6);
// 1 4 5 6 2 3

var pc = _.partial(console.log, _, 2, ___, 5, _, 7);
pc(1);
// 1 2 5 undefined 7
pc(1, 3, 4);
// 1 2 3 5 4 7
pc(1, 3, 4, 6, 8);
// 1 2 3 4 6 5 8 7

var add_all = _.partial(m, ___, add);
add_all(1, 2, 3, 4);

var sub10 = _.partial(m, ___, 10, sub);
sub10(50, 20);