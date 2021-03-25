import { ScaleContinuousNumeric } from 'd3-scale';
import { ResizedDimensions } from 'use-react-dimensions';

export interface NumericAxisProps {
    scale: ScaleContinuousNumeric<number,number>;
    dimensions: ResizedDimensions;
}