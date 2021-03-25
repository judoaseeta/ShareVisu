import React from 'react';
import { NumericAxisProps } from './types';
import isLogScale from '../../utils/isLogScale';
import styles from './styles/numericXAxis.module.scss';

const NumericXAxis: React.FC<NumericAxisProps> = ({
    scale,
    dimensions
}) => {
    const width = React.useMemo(() => {
        return Math.abs(scale.range()[1] -scale.range()[0]);
    },[
        scale,
        dimensions
    ]);
    const ticks = React.useMemo(() => {
        const minTickSize = 50;
        const tickNum = Math.floor(width / minTickSize);
        return scale.ticks(tickNum).map((d => ({
            value: d,
            xPos: scale(d)
        })))
    },[
        scale,
    ]);
    return <g
        transform={`translate(${dimensions.marginLeft},${dimensions.marginTop+ dimensions.boundedHeight + 20 })`}
    >
        <line 
            x1={0}
            x2={width}
            y1={10}
            y2={10}
            stroke="blue"
            strokeWidth="1"
        />
        <rect 
            className={styles.panel}
            width={width}
            x={0}
            y={10}
            height={2}
        />
        {
            ticks.map(({xPos, value })=> 
                <g
                    key={`xAxisTick${value}`}
                >
                    <line 
                        x1={xPos}
                        x2={xPos}
                        y1={10}
                        y2={14}
                        stroke="black"
                    />
                    <text
                        x={xPos}
                        y={22}
                        className={styles.tick }
                    >
                    {value}
                    </text>
                </g>
            )
        }
    </g>;   
};

export default NumericXAxis;


/**
 * 
 * <defs>
            <linearGradient id="myGradient" >
            <stop offset="5%"  stop-color="#dcdde1" />
            <stop offset="25%"  stop-color="#273c75" />
            <stop offset="50%" stop-color="#192a56" />
            <stop offset="75%"  stop-color="#273c75" />
            <stop offset="95%"  stop-color="#dcdde1" />
            </linearGradient>
        </defs>
 */