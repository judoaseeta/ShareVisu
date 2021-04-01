import React from 'react';
import {
    Line
} from 'd3-shape';
import {
    ScalePoint,
    ScaleContinuousNumeric,
    ScaleOrdinal
} from 'd3-scale';
import { 
    PlotCommonProps,
} from './types';
import {
    NestedData
} from '../../types';
import Legend from './line/legend';
import XAxis from '../categoricalAxis/xAxis';
import YAxis from '../numericAxis/numericYAxis';
import XLabel from '../label/xLabel';
import YLabel from '../label/yLabel';
import Title from '../label/title';
// styles
import classnames from 'classnames/bind';
import styles from './styles/line.module.scss';
const cx = classnames.bind(styles);

export interface LinePlotProps extends Omit<PlotCommonProps,'data'> {
    data: NestedData;
    zKey?: string;
    zLabel?: string;
    line: Line<{ [key: string]: string|number}>;
    hoveredIndex: number;
    selectedIndices: number[];
    xScale: ScalePoint<string>;
    yScale: ScaleContinuousNumeric<number,number>;
    zScale?:ScaleOrdinal<string,string>;
    onMouseEnter:(index: number) => void;
    onClick:(index: number) => void;
}

const LinePlot: React.FC<LinePlotProps> = ({
    data,
    dimensions,
    title,
    line,
    hoveredIndex,
    selectedIndices,
    xKey,
    yKey,
    zKey,
    xScale,
    yScale,
    zScale,
    xLabel,
    yLabel,
    zLabel,
    onClick,
    onMouseEnter,
}) => 
<svg
    width={dimensions.width}
    height={dimensions.height}
>
    <rect 
        className={cx('plot')}
        x={0}
        y={0}
        width={dimensions.width}
        height={dimensions.height}
    />
    <g
        transform={`translate(${dimensions.marginLeft},${dimensions.marginTop})`}
    >
        {
            !zScale && <path 
                className={cx('line')}
                d={line(data["default"] as Array<{ [key: string] : string|number}>)!}
                stroke="blue"
                fill="none"
            />
        }
        {
            zScale && Object.keys(data).map( (key,index) => {
                const selected = selectedIndices.includes(index);
                const hovered = hoveredIndex === index;
                return <path 
                    className={cx('line',{
                        selected,
                        unselected: selectedIndices.length > 0 && !selected,
                        hovered: hovered && !selected
                    })}
                    key={key}
                    d={line(data[key] as Array<{ [key: string] : string|number}>)!}
                    stroke={zScale(key)}
                    fill="none"
                />
            }
            )
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
    {
        zScale &&
        zLabel &&
        <Legend 
            dimensions={dimensions}
            legends={Object.keys(data)}
            colorScale={zScale}
            selectedIndices={selectedIndices}
            onMouseEnter={onMouseEnter}
            onClick={onClick}
            zLabel={zLabel}
        />
    }
</svg>;

export default LinePlot;
