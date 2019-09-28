var users = [
  { id: 1, name: 'ID', age: 32 },
  { id: 2, name: 'HA', age: 25 },
  { id: 3, name: 'BJ', age: 32 },
  { id: 4, name: 'PJ', age: 28 },
  { id: 5, name: 'JE', age: 27 },
  { id: 6, name: 'JM', age: 32 },
  { id: 7, name: 'HI', age: 24 },
];

// 1
var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].age < 30) temp_users.push(users[i]);
}
console.log(temp_users.length);

// 2
var ages = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
  ages.push(temp_users[i].age);
}
console.log(ages)

// 3
var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].age >= 30) temp_users.push(users[i])
}
console.log(temp_users.length);

var names = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
  names.push(temp_users[i].name);
}
console.log(names);

// refactoring
function filter(list, predicate) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) new_list.push(list[i]);
  }

  return new_list;
}

// filter 사용
var users_under_30 = filter(users, function (user) { return user.age < 30 });
console.log(users_under_30)

var ages = [];
for (var i = 0, len = users_under_30.length; i < len; i++) {
  ages.push(users_under_30[i].age);
}
console.log(ages);

var users_over_30 = filter(users, function (user) { return user.age > 30 });
console.log(users_over_30);

var names = [];
for (var i = 0, len = users_over_30.length; i < len; i++) {
  names.push(users_over_30[i].name)
}
console.log(names);

// map 사용
function map(list, iteratee) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    new_list.push(iteratee(list[i]));
  }

  return new_list;
}

var users_under_30 = filter(users, function (user) { return user.age < 30 });
console.log(users_under_30.length)

var ages = map(users_under_30, function (user) { return user.age });
console.log(ages);

var users_over_30 = filter(users, function (user) { return user.age > 30 });
console.log(users_over_30.length)

var names = map(users_over_30, function (user) { return user.name });
console.log(names);

// 함수 중첩
var ages = map(
  filter(users, function (user) { return user.age < 30 }),
  function (user) { return user.age }
)
console.log(ages);

var names = map(
  filter(users, function (user) { return user.age >= 30 }),
  function (user) { return user.name }
)
console.log(names);

// 함수 중첩 2
function log_length(value) {
  console.log(value.length)
  return value;
}

console.log(
  log_length(
    map(
      filter(users, function (user) { return user.age < 30 }),
      function (user) { return user.age }
    )
  )
)

console.log(
  log_length(
    map(
      filter(users, function (user) { return user.age >= 30 }),
      function (user) { return user.name }
    )
  )
)

/**
 * 함수를 리턴하는 함수 bvalue
 */
function bvalue(key) {
  return function (obj) {
    return obj[key]
  }
}

console.log(bvalue('a')({ a: 'hi', b: 'hello' }));

/**
 * bvalue로 map의 iteratee 만들기
 */
console.log(
  log_length(
    map(
      filter(users, function (user) { return user.age < 30 }),
      bvalue('age')
    )
  )
)

console.log(
  log_length(
    map(
      filter(users, function (user) { return user.age >= 30 }),
      bvalue('name')
    )
  )
)

console.log("-----------ES6-----------")
/**
 * ES6 사용
 */

console.log(
  log_length(
    map(
      filter(users, user => user.age < 30),
      user => user.age
    )
  )
)

console.log(
  log_length(
    map(
      filter(users, user => user.age >= 30),
      user => user.name
    )
  )
)

var under_30 = user => user.age < 30;
var over_30 = user => user.age >= 30;
var ages = list => map(list, user => user.age);
var names = list => map(list, user => user.name);

console.log(log_length(ages(filter(users, under_30))));
console.log(log_length(names(filter(users, over_30))));

function bvalues(key) {
  return function (list) {
    return map(list, function (user) { return user[key] })
  }
}

var ages = bvalues('age');
var names = bvalues('name');
var under_30 = function (user) { return user.age < 30 };
var over_30 = function (user) { return user.age >= 30 };

console.log(log_length(ages(filter(users, under_30))));
console.log(log_length(names(filter(users, over_30))));

function bvalues(key) {
  var value = bvalue(key);
  return function (list) {
    return map(list, value)
  }
}

// 화살표 함수 사용
var bvalues = key => list => {
  var value = bvalue(key)
  return map(list, value);
}