import { ResizedDimensions } from 'use-react-dimensions';
import { ScalePoint } from 'd3-scale';
export interface CategoricalAxisProps {
    dimensions: ResizedDimensions;
    scale: ScalePoint<string>;
    tickGap?: number;
}
export interface CategoricalAxisTicks {
    value: string;
    Offset: number|undefined;
}