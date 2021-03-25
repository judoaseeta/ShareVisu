import {
    PlotType,
    CommonDataArray
} from '../types';
export interface Plot {
    plotType: PlotType,
    yLabel: string;
    yKey: string;
    xLabel: string;
    zKey?:string;
    zLabel?: string;
    data: CommonDataArray;
    created: number;
    SK: string;
    PK: "Plot";
    xKey: string;
    title: string;
    isXDescent?: boolean;
    isYDescent?: boolean;
}
export interface PlotSummary {
    created: number;
    SK: string;
    plotType: PlotType;
    title: string;
}
interface RawAllPlots {
    item: PlotSummary[];
}
export const getAllPlots = async () => {
    try {
        const result = await fetch('https://49s3baeepb.execute-api.ap-northeast-2.amazonaws.com/dev/getallplot');
        const parsed = await result.json() as RawAllPlots;
        return parsed.item;
    } catch(e) {
        alert(e.message);
        return false;
    } 
}
type RawPlot = Plot | false;
export const getPlotBySK = async(sk: string) => {
    try {
        const result = await fetch(`https://49s3baeepb.execute-api.ap-northeast-2.amazonaws.com/dev/getPlot/${sk}`);
        const parsed = await result.json() as RawPlot;
        
        if(parsed === false) {
            throw new Error('요청한 플랏은 없는 플랏입니다');
        } else {
            return parsed;
        }
    } catch(e) {
        alert(e.message);
        return false;
    } 
}
export interface AddPlotArgs {
    plotType: PlotType;
	title: string;
	xKey: string;
	yKey: string;
    zKey?: string;
	xLabel: string;
	yLabel: string;
    zLabel?: string;
    isXDescent?: boolean;
    isYDescent?: boolean;
	data: CommonDataArray
}

export const addPlot = async(data: AddPlotArgs) => {
    try {
        const request = await fetch('https://49s3baeepb.execute-api.ap-northeast-2.amazonaws.com/dev/uploadPlot',{
            method: 'post',
            body:JSON.stringify(data)
        });
        const parsed = await request.json();
        if(parsed === 'success') {
            return true;
        } else {
            throw new Error('뭔가 잘못 되었습니다')
        }
    } catch(e) {
        alert(e.message);
        return false;
    }
}