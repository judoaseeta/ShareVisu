import React from 'react';
import { 
    PlotCommonProps,
    ScatterSelectedRange
} from './types';
import XAxis from '../numericAxis/numericXAxis';
import YAxis from '../numericAxis/numericYAxis';
import XLabel from '../label/xLabel';
import YLabel from '../label/yLabel';
import Title from '../label/title';
import { ScaleContinuousNumeric } from 'd3-scale';
// utils
import { isInScatterRange } from './utils'
// styles
import classnames from 'classnames/bind';
import styles from './styles/scatter.module.scss';
const sx = classnames.bind(styles);

export interface ScatterProps extends PlotCommonProps{
    xScale: ScaleContinuousNumeric<number,number>;
    yScale: ScaleContinuousNumeric<number,number>;
    onMouseDown: React.MouseEventHandler;
    onMouseMove: React.MouseEventHandler;
    selectingRange: ScatterSelectedRange|null;
    selectedRange: ScatterSelectedRange|null;
}

const Scatter: React.FC<ScatterProps> =({
    xScale,
    yScale,
    dimensions,
    data,
    xKey,
    yKey,
    xLabel,
    yLabel,
    title,
    selectedRange,
    selectingRange,
    onMouseDown,
    onMouseMove,
}) => {

    return (
        <svg
            width={dimensions.width}
            height={dimensions.height}
        >   
            <rect 
                className={sx('plot')}
                x={0}
                y={0}
                width={dimensions.width}
                height={dimensions.height}
            />
            <g
                transform={`translate(${dimensions.marginLeft},${dimensions.marginTop})`}
            >
                {
                    data.map((d,i) => {
                        const cx = xScale(d[xKey] as number);
                        const cy = yScale(d[yKey] as number);
                        return <circle 
                                className={sx('dot',{
                                    selected: selectedRange && isInScatterRange(selectedRange, cx, cy),
                                    unselected: selectedRange && !isInScatterRange(selectedRange, cx, cy)
                                })}
                                cx={cx}
                                cy={cy}
                                r="2"
                                key={`circle${i}`}
                            />
                    }
                    )
                }
                {
                    selectingRange &&
                    <rect 
                        x={selectingRange.x1}
                        y={selectingRange.y1}
                        width={selectingRange.x2 - selectingRange.x1}
                        height={selectingRange.y2 - selectingRange.y1}
                        fill="red"
                        fillOpacity="0.3"
                    />
                }
            </g>
            <XLabel 
                dimensions={dimensions}
                value={xLabel}
            />
            <YLabel 
                dimensions={dimensions}
                value={yLabel}
            />
            <Title 
                dimensions={dimensions}
                value={title}
            />
            <XAxis 
                dimensions={dimensions}
                scale={xScale}
            />
            <YAxis 
                dimensions={dimensions}
                scale={yScale}
            />
            <rect 
                x={0}
                y={0}
                width={dimensions.width}
                height={dimensions.height}
                fill="transparent"
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
            />
        </svg>
    )
};

export default Scatter;
