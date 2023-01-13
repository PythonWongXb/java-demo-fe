const toString = Object.prototype.toString;

export const is = (val: unknown, type: string) => {
    return toString.call(val) === `[object ${type}]`;
};

export const isDef = <T = unknown>(val?: T): val is T => {
    return typeof val !== 'undefined';
};

export const isUnDef = <T = unknown>(val?: unknown): val is T => {
    return !isDef(val);
};

export const isObject = (val: unknown): val is Record<keyof Extract<TDataType, object>, unknown> => {
    return val !== null && is(val, 'Object');
};

export const isString = (val: unknown): val is string => {
    return is(val, 'String');
};

export const isArray = <T>(val: unknown): val is T[] => {
    return (val && Array.isArray(val)) as boolean;
};

export const isEmpty = <T = unknown>(val: T): val is T => {
    if (isArray(val) || isString(val)) {
        return val.length === 0;
    }

    if (val instanceof Map || val instanceof Set) {
        return val.size === 0;
    }

    if (isObject(val)) {
        return Object.keys(val).length === 0;
    }

    return false;
};

export const isDate = (val: unknown): val is Date => {
    return is(val, 'Date');
};

export const isNull = (val: unknown): val is null => {
    return val === null;
};

export const isNullAndUnDef = (val: unknown): val is null | undefined => {
    return isUnDef(val) && isNull(val);
};

export const isNullOrUnDef = (val: unknown): val is null | undefined => {
    return isUnDef(val) || isNull(val);
};

export const isNumber = (val: unknown): val is number => {
    return is(val, 'Number');
};

export const isFunction = (val: unknown): val is Function => { // eslint-disable-line
    return typeof val === 'function';
};

export const isPromise = <T>(val: unknown): val is Promise<T> => {
    return is(val, 'Promise') && isObject(val) && isFunction((val as { then?: () => unknown }).then)
        && isFunction((val as { catch?: () => unknown }).catch);
};

export const isBoolean = (val: unknown): val is boolean => {
    return is(val, 'Boolean');
};

export const isRegExp = (val: unknown): val is RegExp => {
    return is(val, 'RegExp');
};

export const isWindow = (val: unknown): val is Window => {
    return typeof window !== 'undefined' && is(val, 'Window');
};

export const isElement = (val: unknown): val is Element => {
    return isObject(val) && !!(val as { tagName?: string }).tagName;
};

export const isMap = (val: unknown): val is Map<unknown, unknown> => {
    return is(val, 'Map');
};

export const isServer = typeof window === 'undefined';

export const isClient = !isServer;

export const isUrl = (path: string): boolean => {
    const reg =
        // eslint-disable-next-line
        /(((^https?:(?:\/\/)?)(?:[-:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&%@.\w_]*)#?(?:[\w]*))?)$/;
    return reg.test(path);
};

// 断言一个对象上是都存在指定的属性key
export const hasProperty = <T extends string>(key: string, obj: Record<T, unknown>): key is T => {
    return is(obj, 'Object') && obj.hasOwnProperty(key);
};