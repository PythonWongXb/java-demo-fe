type TDataType = keyof any | object;
interface GeneralResData {
    code: number | string;
    data: { [key: string]: TDataType } | TDataType | TDataType[];
    msg?: string;
    status?: number;
}
interface LoginResData {
    retcode: number;
    retmsg?: string;
    result: Partial<{
        command: string;
        data: { [key: string]: TDataType } | TDataType | TDataType[];
        message: string;
    }>;
};

type Env = 'dev' | 'test' | 'pre' | 'online';

interface IUserdata {
    acctId: string;
    acctName: string;
    acctToken: string | null;
    deviceType: string;
    displayName: string;
    loginId: string;
    new: boolean;
    pid: null | string;
    portraitUrl: string;
    refreshToken: string
}
interface Window {
    sensors: {
        track(eventName: string, options: object);
        login(loginId: string): void;
    };
    loginTokerData: Partial<{
        retcode: number;
        retmsg: string;
        result: {
            command: string;
            message: string;
            data: IUserdata
        }
    }>;
    passport: {
        pop: {
            init(config: object): {
                show(): void;
                hide(): void;
            }
        }
    };
}

declare namespace sensors {
    interface Options extends Record<string, unknown> {
        title?: string;
    }

    type EventType = 'click' | 'pv';

    type Logger = {
        (eventName: string): void;
        (eventName: string, eventType: EventType): void;
        (eventName: string, eventType: EventType, options: Options): void;
        (eventName: string, eventType: Options): void;
    }
}

type TPage = {
    currPage: number;
    pageSize: number;
    totalCount?: number;
}