function addMaker(a) {
  return function (b) {
    return a + b;
  }
}

console.log(addMaker(10)(5))

var add5 = addMaker(5)
console.log(add5(3))
console.log(add5(4))