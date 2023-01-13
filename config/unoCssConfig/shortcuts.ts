/* 
    边框组合shortcut
    用法：border-t-solid-1px-#F1F1F1 => border-top: 1px solid #F1F1F1; 
        border-a-double-3px-red => border: 3px double red;
*/
const borderShortCut = ([, , orientation, style, size, flag, color]) => {
    const type = orientation === 'a' ? '' : `-${orientation}`;
    const res = [`border${type}-${size}${flag}`, `border-${style}`, `b-${color}`];
    return res.join(' ');
}

export default [
    {
        'detail-title': 'text-16px font-500',
        'ellipsis': 'overflow-hidden text-ellipsis line-clamp-1',
        'like-link': 'c-aPrimaryColor cursor-pointer',
        'searchDetail-tagItem': 'hleading-24px text-size-12px bg-none px-9px! py-6px! b-aPrimaryColor! mr-8px mb-7px',
    },
    [/^(border|b)-(a|t|l|r|b)-(.+)-(\d+)(.+)-(.+)$/, borderShortCut],
    [/^wihe-(\d+)(.+)$/, ([, d, f]) => `w-${d}${f} h-${d}${f}`], // 同时指定宽度和高度
    [/^hleading-(\d+)(.+)$/, ([, d, f]) => `h-${d}${f} leading-${d}${f}`], // 同时指定高度和行高
] as ([RegExp, (match: RegExpMatchArray) => string] | Record<string, string>)[];