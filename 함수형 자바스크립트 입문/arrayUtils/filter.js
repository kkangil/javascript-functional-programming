export const filter = (array, fn) => {
    let results = [];
    for (const value of array) {
        if (fn(value)) results.push(value);
    }
    return results;
};
