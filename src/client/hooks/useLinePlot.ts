import {
    useCallback,
    useState,
    useMemo,
    MutableRefObject
} from 'react';
import { 
    scalePoint, 
    scaleOrdinal,
    scaleLinear,scaleLog 
} from 'd3-scale';
import { interpolateWarm } from 'd3-scale-chromatic';
import { line as Lineg } from 'd3-shape';
import { ResizedDimensions } from 'use-react-dimensions';
import getNestData from '../utils/nestData';
import { checkIsKeySelected } from '../utils/checkDatas';

interface UseLinePlotProps {
    ref: MutableRefObject<HTMLDivElement|null>,
    data: Array<{ [ key: string] : number|string|undefined}> | null;
    xKey: string;
    yKey: string;
    zKey?: string;
    isYDescent: boolean;
    dimensions: ResizedDimensions;
}

const UseLinePlot = ({
    ref,
    data,
    xKey,
    yKey,
    zKey,
    isYDescent,
    dimensions
}: UseLinePlotProps) => {
    const nestedData = useMemo(() => {
        if(data && zKey) {
            if(zKey !== '-') {
                return getNestData({
                    xKey,
                    data,
                    yKey,
                    zKey
                });
            } else {
                return {
                    default: data.map(d => ({
                        [xKey]:  d[xKey],
                        [yKey]: d[yKey]
                    }))
                }
            }
            
        }
    },[
        data,
        xKey,
        yKey,
        zKey,
    ]);
    const xScale = useMemo(() => {
        if(data) {
            const xPicked = data.map( d => d[xKey] as string);
            return scalePoint()
                        .domain(xPicked)
                        .range([0, dimensions.boundedWidth])
        }
    },[
        data,
        xKey,
        dimensions
    ]);
    const yScale= useMemo(() => {
        if(data) {
            const yPicked = data.map( d => d[yKey] as number);
            const min = Math.min(...yPicked);
            const max = Math.max(...yPicked);
            const domain = isYDescent ? [max, min] : [min, max];
            const gap = max - min;
            if(gap > 100000) {
                return scaleLog()
                        .range([dimensions.boundedHeight,0])
                        .domain(domain)
            } else {
                return scaleLinear()
                .range([dimensions.boundedHeight,0])
                .domain(domain)
            }
        }
    },[
        data,
        dimensions,
        isYDescent,
        yKey
    ]);

    const zScale = useMemo(() => {
        if(nestedData && checkIsKeySelected(zKey)) {
            const zPicked = Object.keys(nestedData);
            return scaleOrdinal<string>()
                        .domain(zPicked)
                        .range(zPicked.map( (d,i)=> interpolateWarm(i / zPicked.length)))
        }
    },[
        nestedData,
        zKey,
    ]);
    const line = useMemo(() => {
        if(xKey && checkIsKeySelected(xKey) && yKey && checkIsKeySelected(yKey) && xScale && yScale) {
            return Lineg<{ [key: string] : string|number }>()
                    .x( d => xScale(d[xKey] as string)!)
                    .y( d => yScale(d[yKey] as number))
        }
    },[
        xScale,
        yScale
    ]);
    const [ selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const onClick = useCallback((i: number) => {
        const pos = selectedIndices.findIndex(n => n===i);
        if(pos > -1) {
            setSelectedIndices(indices => [
                ...indices.slice(0,pos),
                ...indices.slice(pos + 1)
            ]);
        } else {
            setSelectedIndices(indices => [
                ...indices,
                i
            ])
        }
    },[
        selectedIndices
    ]);
    const [ hoveredIndex, setHoveredIndex ] = useState(-1);
    const onMouseEnter = useCallback((i:number) => {
        setHoveredIndex(i);
    },[

    ]);
    return {
        xScale,
        yScale,
        zScale,
        nestedData,
        line,
        selectedIndices,
        hoveredIndex,
        onMouseEnter,
        onClick
    }
};

export default UseLinePlot;

