export const reduce = (array, fn, initialValue) => {
    let accumulator;

    if (initialValue !== undefined) accumulator = initialValue;
    else accumulator = array[0];

    if (initialValue === undefined) {
        for (let i = 1; i < array.length; i++) {
            accumulator = fn(accumulator, array[i]);
        }
    } else {
        for (const value of array) {
            accumulator = fn(accumulator, value);
        }
    }

    return accumulator;
};
