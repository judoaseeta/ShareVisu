import {
    useCallback,
    useEffect,
    useState,
    useMemo,
    MutableRefObject
} from 'react';
import { scaleLinear, scaleLog } from 'd3-scale';
import { ResizedDimensions } from 'use-react-dimensions';
import { ScatterSelectedRange } from '../component/plots/types';

interface UseScatterProps {
    ref: MutableRefObject<HTMLDivElement|null>,
    data: Array<{ [ key: string] : number|string|undefined}> | null;
    xKey: string;
    yKey: string;
    isXDescent: boolean;
    isYDescent: boolean;
    dimensions: ResizedDimensions;
}
const UseScatter = ({
    ref,
    data,
    dimensions,
    isXDescent,
    isYDescent,
    xKey,
    yKey,
}:UseScatterProps) => {
    const xScale = useMemo(() => {
        if(data) {
            const xPicked = data.map( d => d[xKey] as number);
        const min = Math.min(...xPicked);
        const max = Math.max(...xPicked);
        const domain = isXDescent ? [max,min]: [min,max];
        const gap = max - min;
        if(gap > 100000) {
            return scaleLog()
                    .range([0, dimensions.boundedWidth])
                    .domain(domain)
        } else {
            return scaleLinear()
            .range([0, dimensions.boundedWidth])
            .domain(domain)
        }
        }
    },[
        data,
        dimensions,
        isXDescent,
        xKey
    ]);
    //
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
    const [ startPoint ,setStartPoint ] = useState<{ x: number, y: number}>({
        x: -1,
        y: -1,
    });
    const [ selectingRange, setSelectingRange ] = useState<ScatterSelectedRange | null>(null);
    const [ selectedRange, setSelectedRange ] = useState<ScatterSelectedRange | null>(null);
    const [isMouseDown, setIsMouseDown ] = useState(false);
    const onMouseDown:React.MouseEventHandler = useCallback((e) => {
        const container = ref.current;
        if(container) {
            setSelectedRange(null);
            setIsMouseDown(true);
            const { left, top} = container.getBoundingClientRect();
            setStartPoint({
                x: e.clientX - left - dimensions.marginLeft,
                y: e.clientY - top - dimensions.marginTop
            });
        }
    },[
        ref,
        dimensions,
        selectedRange
    ]);
    
    const onMouseMove:React.MouseEventHandler = useCallback((e) => {
        const container = ref.current;
        // mouse is downed
        if(isMouseDown && container) {
            const { x: sx, y: sy } = startPoint;
            const { left, top} = container.getBoundingClientRect();
            const tx = e.clientX - left -dimensions.marginLeft;
            const ty = e.clientY - top - dimensions.marginTop;
            // calculate range
            const x1 = tx >= sx ? sx : tx;
            const x2 = tx >= sx ? tx : sx; 
            const y1 = ty >= sy ? sy : ty;
            const y2 = ty >= sy ? ty : sy;
            setSelectingRange({
                x1,
                x2,
                y1,
                y2
            });
        }   
    },[
        isMouseDown,
        ref,
        dimensions,
        startPoint,
    ]);
    const globalMouseUp = useCallback((e: MouseEvent) => {
            if(isMouseDown && selectingRange) {
                setIsMouseDown(false);
                setSelectedRange({
                    ...selectingRange
                });
                setSelectingRange(null);
                setStartPoint({
                    x: -1,
                    y: -1
                });
            }
    },[
        isMouseDown,
        selectingRange
    ]);

    const onClickIfSelected = useCallback((e:MouseEvent) => {
        if(!isMouseDown && selectedRange) {
            e.preventDefault();
            setSelectedRange(null);
        }
    },[
        selectedRange,
        isMouseDown
    ]);
    useEffect(() => {
        if(isMouseDown && selectingRange) {
            window.addEventListener('pointerup', globalMouseUp);
        } else {
            window.removeEventListener('pointerup', globalMouseUp);
        }
        if(!isMouseDown && selectedRange) {
            window.addEventListener('pointerdown', onClickIfSelected,true);
        } else {
            window.removeEventListener('pointerdown', onClickIfSelected);
        }
        return () => {
            window.removeEventListener('pointerup', globalMouseUp);
            window.removeEventListener('pointerdown', onClickIfSelected,true);
        }
    },[
        isMouseDown,
        selectingRange,
        selectedRange
    ]);
    return {
        ref,
        xScale,
        yScale,
        selectingRange,
        selectedRange,
        onMouseDown,
        onMouseMove,
    }
}

export default UseScatter;
