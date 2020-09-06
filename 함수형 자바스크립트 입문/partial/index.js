export const partial = function (fn, ...partialArgs) {
    let args = partialArgs;
    return function (...fullArgs) {
        let arg = 0;
        for (let i = 0; i < args.length && arg < fullArgs.length; i++) {
            if (args[i] === undefined) {
                args[i] = fullArgs[arg++];
            }
        }
        return fn.apply(null, args);
    };
};

let delayTenMs2 = partial(setTimeout, undefined, 1000);
delayTenMs2(() => console.log("Do Y task"));
let delayTenMs3 = partial(setTimeout, () => console.log("Do X task"), undefined);
delayTenMs3(1000);
