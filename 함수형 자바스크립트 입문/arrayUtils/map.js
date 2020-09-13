export const map = (array, fn) => {
    let results = [];
    for (const value of array) {
        results.push(fn(value));
    }
    return results;
};
