// 用到什么补充什么
type EchartsSeriesItem = {
    data: (string | number)[],
    type: string;
    label: {
        show: boolean;
        position: string;
        valueAnimation: boolean;
        formatter: string;
    };
}

type EchartsGraphAxisDataValue = string | number;
interface EchartsGraphYAxisDataObject {
    value: EchartsGraphAxisDataValue
    itemStyle: {
        color: string
    }
}
type EchartsGraphAxisData = (EchartsGraphYAxisDataObject | EchartsGraphAxisDataValue)[]

interface EchartsParams {
    xAxis: {
        type?: string;
        data: EchartsGraphAxisData;
        nameGap: number;
    },
    yAxis: {
        type: string;
        show: boolean;
    },
    series: SeriesItem[];

    color: string[];
    grid: {
        left: string;
        right: string;
        bottom: string;
        containLabel: boolean;
    };
    tooltip: {
        trigger: string;
        formatter: string;
    };
}

interface EchartsGraphObj {
    setOption: (params: Params) => string;
}

interface Window {
    echarts: {
        init: (el: HTMLElement) => EchartsGraphObj;
    }
}