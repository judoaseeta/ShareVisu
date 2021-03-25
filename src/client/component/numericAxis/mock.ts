import { scaleLinear } from 'd3-scale';
import { mockDimensions } from '../mocks';
export const mockXscale = scaleLinear()
                                .range([0, mockDimensions.boundedWidth ])
                                .domain([0,10000]);
export const mockYLinearScale =  scaleLinear()
.range([mockDimensions.boundedHeight, 0])
.domain([0,10000]);

                    