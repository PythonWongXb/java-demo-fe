import moment from 'dayjs';

// 项目用到的各种Util
export const thousandNum = (num: string | null | undefined) => {
    return num ? (num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : '';
};

export const copy = (value: string): void => {
    const input = document.createElement('input');
    //将input的值设置为需要复制的内容
    input.value = value;
    document.body.appendChild(input);
    //选中input标签
    input.select();
    //执行复制
    document.execCommand('copy');
    //移除input标签
    document.body.removeChild(input);
};

export const dimText = (text: string) => {
    // @xiangbo todo 正则match匹配出*的内容，暂时固定长度了
    const dimTextAreaContent = '***';
    const dom = `<span class="dim">${dimTextAreaContent}</span>`;
    const reg = new RegExp(/(\s*\*+)+/g);
    return text.replace(reg, dom);
};

export const reciprocalYear = (reciprocal: number): number => {
    const d = new Date();
    const curYear = d.getFullYear();
    return curYear - reciprocal;
};


export const defaultValueObject = <ObjectType>(obj: Record<string, ObjectType>, defaultString: string = '-'):
    Record<string, ObjectType | string> => {
    const blankObj: Record<string, ObjectType | string> = {};
    for (let item in obj) {
        const isFalsy = !obj[item];
        const isZeroNumber = obj[item] === 0;
        const isNullString = obj[item] === 'null';
        if (isFalsy || isNullString) {
            if (isZeroNumber) {
                blankObj[item] = obj[item];
            } else {
                blankObj[item] = defaultString;
            }
        } else {
            blankObj[item] = obj[item];
        }
    }
    return blankObj;
};

export const defaultValueString = (value?: string | number, defaultText: string = '-'): string => {
    if (value === 0) {
        return String(value);
    } else {
        if (value) {
            if (value === 'null') {
                return defaultText;
            } else {
                return String(value);
            }
        } else {
            return defaultText;
        }
    }
};

export const formatPublishDate = (date: string) => {
    if (!date) {
        return date;
    }
    const now = moment().valueOf();
    const original = moment(date).valueOf();
    const gap = now - original;
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    if (gap < hour) {
        return `${gap / minute >= 1 ? Math.floor(gap / minute) : 1}分钟前`;
    } else if (gap >= hour && gap < day) {
        return `${Math.floor(gap / hour)}小时前`;
    } else if (date.includes('00:00:00')) {
        return date.slice(0, date.length - 9);
    }
    return date.slice(0, date.length - 3);
};

// 小数点转化百分比
// 兼容文案与数字类型的小数
export const decimalTransformToPercent = (value?: string) => {
    if (value) {
        const transValue = Number(value);
        if (Number.isNaN(transValue)) {
            return value === 'null' ? '-' : value;
        } else {
            return (transValue * 100).toFixed(2) + '%';
        }
    } else {
        return '-';
    }
};

// 小数string转化百分比数字
export const decimalStringTransformToNumber = (value?: string) => {
    if (value) {
        const transValue = Number(value);
        if (Number.isNaN(transValue)) {
            return 0;
        } else {
            return (transValue * 100);
        }
    } else {
        return 0;
    }
};

// 小数string正负
export const getDecimalInfo = (value?: string) => {
    const transValue = decimalStringTransformToNumber(value);
    return {
        value: transValue >= 0 ? transValue.toFixed(0) :(-transValue).toFixed(0),
        isPositive: transValue >= 0
    };
};