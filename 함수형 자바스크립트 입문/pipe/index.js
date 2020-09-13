import {reduce} from "../arrayUtils/reduce";

export const pipe = (...fns) => value => reduce(fns, (acc,fn) => fn(acc), value);

let splitIntoSpaces = (str) => str.split(" ");
let count = (array) => array.length;
let oddOrEven = (ip) => (ip % 2 === 0 ? "even" : "odd");

const oddOrEvenWords = pipe(splitIntoSpaces, count, oddOrEven);
console.log(oddOrEvenWords("hello your reading about composition")); // "odd"

let add = (x,y) => x + y;
let double = x => x + x;

// 파이프 연산자 없이
add(10, double(7));

// 파이프 연산자 사용
7 |> double |> (_ => add(10, _));

export const identity = it => {
    console.log(it);
    return it;
};
