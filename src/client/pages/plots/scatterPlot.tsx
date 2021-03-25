import React from 'react';
import useDimensions from 'use-react-dimensions';
//components 
import ScatterPlotComponent, { ScatterProps } from '../../component/plots/scatter';
import Stats from '../../component/plots/stats';
// hooks
import UseScatter from '../../hooks/useScatter';
// styles
import classnames from 'classnames/bind';
import styles from './styles/scatterPlot.module.scss';
const cx = classnames.bind(styles);

interface ScatterPlotProps {
    data: Array<{ [key: string]: string|number|undefined}> | null;
    isXDescent?: boolean;
    isYDescent?: boolean;
    xKey:string;
    yKey:string;
    xLabel: string;
    yLabel: string;
    title: string;
    xLabelError?: string;
    yLabelError?: string;
}
const ScatterPlot: React.FC<ScatterPlotProps> = ({
    data,
    isXDescent = false,
    isYDescent = false,
    xKey,
    yKey,
    xLabel,
    yLabel,
    xLabelError,
    yLabelError,
    title
}) => {
    const { ref, dimensions } = useDimensions<HTMLDivElement>({
        marginTop: 50,
        marginLeft:100,
        marginRight:50,
        marginBottom: 50,
        width: 100,
        height: 50
    })
    const {
        xScale,
        yScale,
        selectingRange,
        selectedRange,
        onMouseDown,
        onMouseMove,
    } = UseScatter({
        data,
        ref: (ref as React.MutableRefObject<HTMLDivElement>),
        dimensions,
        isXDescent,
        isYDescent,
        xKey,
        yKey
    });
    return <div
        className={cx('container')}
    >
        
        <div
            ref={ref}
            className={cx('plotHolder')}
        >
            {
                !xLabelError &&
                !yLabelError &&
                data &&
                xScale &&
                yScale &&
                dimensions.isResized &&
                <ScatterPlotComponent 
                    xScale={xScale}
                    yScale={yScale}
                    data={data}
                    dimensions={dimensions}
                    xLabel={xLabel}
                    yLabel={yLabel}
                    xKey={xKey}
                    yKey={yKey}
                    title={title}
                    selectedRange={selectedRange}
                    selectingRange={selectingRange}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                />
            }
        </div>
        {
            data &&
            xScale &&
            yScale &&
            <Stats 
                data={data}
                xKey={xKey}
                yKey={yKey}
                xScale={xScale}
                yScale={yScale}
                range={selectedRange}
            />
        }
    </div>
}

export default ScatterPlot;
