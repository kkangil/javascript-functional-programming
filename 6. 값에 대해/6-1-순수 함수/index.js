/**
 * 순수 함수와 순수 함수가 아닌 함수
 */

// 순수 함수
function add(a, b) {
  return a + b;
}

// 순수 함수가 아닌 함수
function add2(obj, value) {
  obj.value = obj.value + value;
  return obj.value;
}

// 작은 차이지만 순수 함수
function add3(obj, value) {
  return obj.value + value;
}

// 작은 차이지만 순수 함수 2
function add4(obj, value) {
  return { value: obj.value + value };
}

