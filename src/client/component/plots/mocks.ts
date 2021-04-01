import { 
    scaleLinear,
    scalePoint
} from 'd3-scale';
import { line } from 'd3-shape';
import mockLineData from './mockLineData.json';
import { mockDimensions,mockDimensions2 } from '../mocks';
import createNestData from '../../utils/nestData';
export const scatterXscale = scaleLinear()
                                .range([0, mockDimensions.boundedWidth ])
                                .domain([0,10000]);
export const scatterYScale =  scaleLinear()
.range([mockDimensions.boundedHeight, 0])
.domain([0,10000]);

export const mockScatterData = Array(100).fill(null).map( d => ({
    x: Math.floor(Math.random() * 10000),
    y: Math.floor(Math.random() * 10000)
}));

const mockXkey = "year";
const mockYkey = "n";
const mockLineXPicked = mockLineData.map(d => String(d[mockXkey]));
const mockLineYPicked = mockLineData.map(d => d[mockYkey]);
export const mockLineXscale = scalePoint<string>()
                                .domain(mockLineXPicked)
                                .range([0, mockDimensions2.boundedWidth]);
export const mockLineYscale = scaleLinear()
                                .domain([Math.min(...mockLineYPicked),Math.max(...mockLineYPicked)])
                                .range([mockDimensions2.boundedHeight,0]);
export const mockLine = line<{ [key: string]: string|number}>()
                            .x( d => mockLineXscale(String(d[mockXkey]))!)
                            .y(d => mockLineYscale(d[mockYkey] as number))
export const getNestedData = () => {

    return createNestData({
        xKey: mockXkey,
        yKey: mockYkey,
        data: mockLineData,
        zKey:"name"
    })
}