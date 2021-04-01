import { scalePoint } from 'd3-scale';
import { mockDimensions } from '../mocks';
const mockCategoricalData = [
    "Alpha",
    "Beta",
    "Gamma",
    "Theta",
    "Zebra",
    'Xulu',
    "Julia",
    "May",
    "Octopus",
    "Xray",
    "Signal",
    "Null",
    "Zax",
    "Power",
    "CC",
    "Dog"
];
export const mockXScale = scalePoint()  
                            .domain(mockCategoricalData)
                            .range([0, mockDimensions.boundedWidth]);
