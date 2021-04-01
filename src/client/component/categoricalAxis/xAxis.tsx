import React from 'react';
import { 
    CategoricalAxisProps,
    CategoricalAxisTicks
} from './types';
import styles from './styles/categoricalAxis.module.scss';
const CategoricalXAxis: React.FC<CategoricalAxisProps> = ({
    scale,
    dimensions,
    tickGap = 80,
}) => {
    const width = React.useMemo(() => {
        return Math.abs(scale.range()[1] -scale.range()[0]);
    },[
        scale,
        dimensions
    ]);
    const ticks:CategoricalAxisTicks[] = React.useMemo(() => {
        const gap = tickGap >= Math.floor(width / 2) ? Math.floor(width / 2)
                            : tickGap < 1 ? Math.floor(width * tickGap) : tickGap;
        const domain = scale.domain();
        const possibleTickGap = Math.floor( width / gap);
        const possibleTickNum = Math.floor(domain.length / possibleTickGap);
        return domain.reduce((acc,curr, index) => {
            if(index % possibleTickNum === 0) {
                return [
                    ...acc,
                    {
                        value: curr,
                        Offset: scale(curr)
                    }
                ]
            }
            return acc;
        },[] as CategoricalAxisTicks[]);
    },[
        scale,
        width,
        tickGap
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
        {
            ticks &&
            ticks.map( ({ value, Offset }) => {
                if(Offset) {
                    return (
                        <g
                            key={`xAxisTick${value}`}
                        >
                            <line 
                                x1={Offset}
                                x2={Offset}
                                y1={10}
                                y2={14}
                                stroke="black"
                            />
                            <text
                                x={Offset}
                                y={22}
                                className={styles.xTick}
                            >
                                {value}
                            </text>
                        </g>
                    )
                }
            })
        }
    </g>
}

export default CategoricalXAxis;
