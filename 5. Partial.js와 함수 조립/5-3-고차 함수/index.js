/**
 * _.all, _.spread
 */

_.all(10, 5, [
  function (a, b) { return a + b },
  function (a, b) { return a - b },
  function (a, b) { return a * b }
])

_.spread(10, 5, [
  function (a) { return a * a },
  function (b) { return b * b }
])

/**
 * _.all, _.spread with pipe line
 */

_.go(
  10,
  _.all(
    function (a) { return a + 5 },
    function (a) { return a - 5 },
    function (a) { return a * 5 }
  ),
  _.spread(
    function (a) { return a + 1 },
    function (b) { return b + 2 },
    function (c) { return c + 3 }
  ),
  console.log
)

// 16 7 53