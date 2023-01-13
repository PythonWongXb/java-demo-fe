export default [
    [/^hc-(\d+(%|vh))-(\d+)(.+)$/, ([, pd, , d, f]) => ({ height: `calc(${pd} - ${d}${f})` })],
    [/^min-hc-(\d+(%|vh))-(\d+)(.+)$/, ([, pd, , d, f]) => ({ 'min-height': `calc(${pd} - ${d}${f})` })],
    [/^box-shadow-(\d+)-(\d+)-(\d+)-(\d+)-(.+)$/, ([, x, y, mr, kr, color]) => ({ 'box-shadow': `${x}px ${y}px ${mr}px ${kr}px ${color}` })]
] as [RegExp, (match: RegExpMatchArray) => string | Record<string, string>][];