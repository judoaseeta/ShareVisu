import React,{
    useMemo
} from 'react';
import { ScaleContinuousNumeric } from 'd3-scale';
import { CommonDataArray } from '../../types';
import { ScatterSelectedRange } from './types';
import { 
    getStat, 
    isInScatterRange 
} from './utils';
// styles
import styles from './styles/stats.module.scss';


interface StatsProps {
    data: CommonDataArray;
    range: ScatterSelectedRange | null;
    xKey: string;
    yKey: string;
    xScale: ScaleContinuousNumeric<number,number>;
    yScale: ScaleContinuousNumeric<number,number>;
}
const Stats: React.FC<StatsProps> = ({
    data,
    range,
    xKey,
    yKey,
    xScale,
    yScale
}) => {
    const stats = useMemo(() => {
        let values; 
        if(range) {
            values = data.filter(d => 
                isInScatterRange(range, xScale(d[xKey] as number), yScale(d[yKey] as number))
            );
        } else {
            values = data;
        }
        const xValues = values.map( val => val[xKey] as number);
        const yValues = values.map( val => val[yKey] as number);
        return getStat(xValues,yValues);
    },[
        data,
        range,
        xKey,
        yKey,
        xScale,
        yScale
    ]);
    return <section
        className={styles.container}
    >
        {
            stats &&
            <>
                <p>X-mean: {stats[0].toFixed(5)}</p>
                <p>Y-mean: {stats[1].toFixed(5)}</p>
                <p>X-deviation: {stats[2].toFixed(5)}</p>
                <p>Y-deviation: {stats[3].toFixed(5)}</p>
                <p>X/Y Correlation(r): {stats[4].toFixed(5)}</p>
            </>
        }
        {
            !stats &&
            <p>선택된 샘플들이 없습니다.</p>
        }
    </section>
}

export default Stats;
