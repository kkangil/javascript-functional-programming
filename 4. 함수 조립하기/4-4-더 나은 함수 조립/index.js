_.pipe(
  function () {
    return this.a;
  },
  console.log, // 1
  function () {
    this.b = 2;
    return this;
  },
  console.log, // {a: 1, b: 2}
).call({ a: 1 });

var obj = {
  a: 10,
  method1: _.pipe(
    function () {
      return this.a;
    },
    console.log, // 10
    function () {
      this.b = 2;
      return this;
    },
    console.log // {a: 10, b: 2, method1: ƒ}
  )
}

obj.method1();

_.go(10,
  function (a) { return a / 2 },
  function (a) { return a + 2 },
  console.log // 7
)