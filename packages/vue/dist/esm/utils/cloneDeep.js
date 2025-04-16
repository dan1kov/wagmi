// Credit: https://github.com/TanStack/query/blob/01ce023826b81e6c41e354f27691f65c9725af67/packages/vue-query/src/utils.ts
import { isRef, unref } from 'vue-demi';
function cloneDeep(value, customize) {
    if (customize) {
        const result = customize(value);
        // If it's a ref of undefined, return undefined
        if (result === undefined && isRef(value))
            return result;
        if (result !== undefined)
            return result;
    }
    if (Array.isArray(value))
        return value.map((val) => cloneDeep(val, customize));
    if (typeof value === 'object' && isPlainObject(value)) {
        const entries = Object.entries(value).map(([key, val]) => [
            key,
            cloneDeep(val, customize),
        ]);
        return Object.fromEntries(entries);
    }
    return value;
}
export function deepUnref(value) {
    return cloneDeep(value, (val) => {
        if (isRef(val))
            return deepUnref(unref(val));
        return undefined;
    });
}
// biome-ignore lint/complexity/noBannedTypes:
function isPlainObject(value) {
    if (Object.prototype.toString.call(value) !== '[object Object]')
        return false;
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.prototype;
}
//# sourceMappingURL=cloneDeep.js.map