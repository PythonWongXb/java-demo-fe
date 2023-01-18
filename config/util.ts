import { loadEnv } from 'vite';
interface Ictx {
    mode: 'test' | 'pre' | 'online',
    command: 'build' | 'preview' | 'serve'
}
// 生成版本号
export function getCurrentTime(): string {
    const pad0ToStart = (num: number, len = 2, slotSymbol = '0'): string => {
        const str = num.toString();
        return str.padStart(len, slotSymbol);
    };
    const date = new Date();
    const Y = date.getFullYear();
    const M = date.getMonth() + 1;
    const D = date.getDate();
    const hh = date.getHours();
    const mm = date.getMinutes();
    const ss = date.getSeconds();
    const dateList = [Y, M, D, hh, mm, ss].map(d => pad0ToStart(d));
    return dateList.join('');
};

export const getBuildEnv = (command: string, mode: string): Record<string, string> => {
    let env = {};
    const root = process.cwd();
    const isBuild = command.startsWith('build');
    if (!isBuild) {
        env = loadEnv((process.argv[3] === '--mode' ? process.argv[4] : process.argv[3]), root);
    } else {
        env = loadEnv(mode, root);
    }
    return env;
}
