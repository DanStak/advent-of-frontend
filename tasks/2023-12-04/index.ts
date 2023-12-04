export const memoize = <T = any>(fn: (arg: T) => any) => {

    if(typeof fn !== 'function') throw new Error('Function to be memoized must be a function.')

    const cache = new Map();

    return (arg: T) => {
        if(cache.has(arg)) {
            return cache.get(arg)
        } else {
            const result = fn(arg);
            cache.set(arg, result);
            return result;
        }
    }
};