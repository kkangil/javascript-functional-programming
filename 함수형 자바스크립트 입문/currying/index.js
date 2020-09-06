export const curry = (fn) => {
    if (typeof fn !== "function") {
        throw Error("No function provided");
    }

    return function curriedFn(...args) {
        if (args.length < fn.length) {
            return function (...curryArgs) {
                return curriedFn.apply(null, args.concat(curryArgs));
            };
        }
        return fn.apply(null, args);
    };
};

let match = curry(function (expr, str) {
    return str.match(expr);
});

let hasNumber = match(/[0-9]+/);
let filter = curry(function (f, arr) {
    return arr.filter(f);
});
let findNumbersInArray = filter(hasNumber);
console.log(findNumbersInArray(["js", "number1"]));

let map = curry(function (f, arr) {
    return arr.map(f);
});

let squareAll = map((x) => x * x);
console.log(squareAll([1, 2, 3]));
