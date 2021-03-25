import {
    ScaleContinuousNumeric,
    ScaleLogarithmic,
} from 'd3-scale';

export default function isLogScale(scaleNumeric: ScaleContinuousNumeric<number,number>): scaleNumeric is ScaleLogarithmic<number,number> {
    return !!(scaleNumeric as ScaleLogarithmic<number,number>).base;
}