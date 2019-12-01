
/**
 * _.go.call
 */

var user = { name: "Cojamm" };
_.go.call(user, 32,
  function (age) {
    this.age = age;
  },
  function () {
    console.log(this.name);
  },
  function () {
    this.job = "Rapper";
  }
)

console.log(user); // {name: "Cojamm", age: 32, job: "Rapper"}

/**
 * _.indent
 */

var f1 = _.indent(
  function () {
    console.log(this, arguments); // 1
    return 'hi';
  },
  function () {
    console.log(this, arguments) // 2
  }
)

f1(1, 2);

/**
 * 값 이어주기
 */

var f2 = _.indent(
  function (a) { this.b = a + 10; },
  function () { },
  function () { },
  function () { console.log(this.b) },
)

f2(5); // 15
f2(7); // 17

/**
 * _.indent 두번 이상 하기
 */

var f3 = _.indent(
  function (a) {
    this.b = a + 10;
  },
  _.indent(
    function () {
      this.b = 20;
      console.log(this.b); // 20
      console.log(this.parent.b) // 15
    },
    function () {
      console.log(this.parent.arguments); // [5]
    }
  ),
  function () {
    console.log(this.b);
  }
)

f3(5);

/**
 * _.async
 */
_.go.async(1, function (a) {
  return a;
}).then(console.log);
console.log(2);

// 2
// 1