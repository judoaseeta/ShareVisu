import { ResizedDimensions } from 'use-react-dimensions';

export interface PlotCommonProps {
    title: string;
    xKey: string;
    yKey: string;
    xLabel: string;
    yLabel: string;
    data: Array<{ [key: string] : string|number| undefined}>;
    dimensions: ResizedDimensions;
}

export interface ScatterSelectedRange {
    x1: number,
    x2: number,
    y1: number,
    y2: number
}