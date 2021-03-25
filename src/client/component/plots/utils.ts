import { ScatterSelectedRange } from './types';
export const isInScatterRange = (range: ScatterSelectedRange, x: number, y:number) => 
x <= range.x2 && x >= range.x1 && y <= range.y2 && y >= range.y1;

import { mean , deviation } from 'd3-array';

type GetStatsReturn = [number,number,number,number,number] | undefined;

export function getStat(x: number[], y:number[]):GetStatsReturn {
    const xMean = mean(x);
    const yMean = mean(y);
    // if mean is not undefined, the var,dev,corr should be exists.
    if(xMean && yMean) {
        const xDev = deviation(x)!;
        const yDev = deviation(y)!;
        const sum = x.reduce((acc,curr,i) => {
            const xVar = curr - xMean;
            const yVar = y[i] - yMean; 
            const xVarSquared = Math.pow(xVar,2);
            const yVarSquared = Math.pow(yVar,2);
            return [acc[0] + xVar * yVar, acc[1] + xVarSquared, acc[2] +yVarSquared];
        },[0,0,0]);
        const corr = sum[0] / Math.sqrt(sum[1] * sum[2]);
        return [ xMean, yMean,xDev, yDev,corr];
    } else return undefined;

}