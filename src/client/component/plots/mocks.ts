import { scaleLinear } from 'd3-scale';
import { mockDimensions } from '../mocks';
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