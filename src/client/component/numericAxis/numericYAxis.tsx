import React from 'react';
import { NumericAxisProps } from './types';
import styles from './styles/numericXAxis.module.scss';

const NumericYAxis: React.FC<NumericAxisProps> = ({
    scale,
    dimensions
}) => {
    const height = React.useMemo(() => {
        return Math.abs(scale.range()[1] -scale.range()[0]);
    },[
        scale,
        dimensions
    ]);
    const ticks = React.useMemo(() => {
        const minTickSize = 50;
        const tickNum = Math.floor(height / minTickSize);
        return scale.ticks(tickNum).map((d => ({
            value: d,
            yPos: scale(d)
        })))
        
    },[
        scale,
    ]);
    return <g
        transform={`translate(${dimensions.marginLeft - 46},${dimensions.marginTop})`}
    >
        <line 
            x1={28}
            x2={28}
            y1={0}
            y2={height}
            stroke="blue"
            strokeWidth="1"
        />
        <rect 
            className={styles.panel}
            width={2}
            x={26}
            y={0}
            height={height}
        />
        {
            ticks.map(({yPos, value })=> 
                <g
                    key={'ypos' + value}
                >
                    <line 
                        x1={23}
                        x2={27}
                        y1={yPos}
                        y2={yPos}
                        stroke="black"
                    />
                    <text
                        x={0}
                        y={yPos}
                        className={styles.tick}
                        alignmentBaseline="central"
                    >
                    {value}
                    </text>
                </g>
            )
        }
    </g>;   
};

export default NumericYAxis;
