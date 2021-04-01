import React from 'react';
import { ResizedDimensions } from 'use-react-dimensions';
import { ScaleOrdinal } from 'd3-scale';
import classnames from 'classnames/bind';
import styles from '../styles/legend.module.scss';
const cx = classnames.bind(styles);

export interface LegendProps {
    dimensions: ResizedDimensions;
    colorScale:ScaleOrdinal<string,string>;
    legends: string[];
    selectedIndices: number[];
    zLabel: string;
    onMouseEnter:(index:number) => void;
    onClick:(index:number) => void;
}
const Legend: React.FC<LegendProps> = ({
    dimensions,
    legends,
    colorScale,
    selectedIndices,
    zLabel,
    onMouseEnter,
    onClick
}) => {
    const centroid = dimensions.width - dimensions.marginRight / 2; 
    return (
        <g
            transform={`translate(${dimensions.boundedWidth + dimensions.marginLeft},${dimensions.marginTop})`}
        >
            <text
                x={0}
                y={0}
                fontSize="15px"
            >{zLabel}</text>
            {
                legends.map( (legend,i) => 
                    <g
                        className={cx('legend',{
                            selected: selectedIndices.includes(i),
                            unselected: selectedIndices.length > 0 && !selectedIndices.includes(i)
                        })}
                        transform={`translate(${dimensions.marginRight / 4},${20 + (i * 20)})`}
                        key={legend}
                        onMouseEnter={() => onMouseEnter(i)}
                        onClick={() => onClick(i)}
                    >
                        <circle 
                            cx={0}
                            cy={3}
                            r={6}
                            fill={colorScale(legend)}
                        />
                        <text
                            x={10}
                            y={3}  
                            alignmentBaseline="central"
                        >{legend}</text> 
                    </g>   
                )
            }
        </g>
    );
}

export default Legend;
