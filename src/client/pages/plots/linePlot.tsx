import React from 'react';
import useDimensions from 'use-react-dimensions';
import LinePlotComponent from '../../component/plots/line';
// hooks
import UseLinePlot from '../../hooks/useLinePlot';
// styles
import classnames from 'classnames/bind';
import styles from './styles/plot.module.scss';
const cx = classnames.bind(styles);

interface LinePlotProps {
    data: Array<{ [key: string]: string|number|undefined}> | null;
    isYDescent?: boolean;
    xKey:string;
    yKey:string;
    zKey?: string;
    xLabel: string;
    yLabel: string;
    zLabel?: string;
    title: string;
    xLabelError?: string;
    yLabelError?: string;
}

const LinePlot: React.FC<LinePlotProps> = ({
    data,
    isYDescent = false,
    xKey,
    yKey,
    zKey,
    xLabel,
    yLabel,
    zLabel,
    xLabelError,
    yLabelError,
    title
}) => {
    const { ref, dimensions } = useDimensions<HTMLDivElement>({
        marginTop: 50,
        marginLeft:100,
        marginRight:200,
        marginBottom: 50,
        width: 100,
        height: 50
    });
    const {
        line,
        xScale,
        yScale,
        zScale,
        nestedData,
        selectedIndices,
        hoveredIndex,
        onClick,
        onMouseEnter
    } = UseLinePlot({
        xKey,
        yKey,
        zKey,
        ref,
        data,
        isYDescent,
        dimensions
    });
    return (
        <div
            className={cx('container',{
                full: true
            })}
        >
            <div
                ref={ref}
                className={cx('plotHolder')}
            >
                {
                    !xLabelError &&
                    !yLabelError &&
                    line &&
                    nestedData &&
                    xScale &&
                    yScale &&
                    dimensions.isResized &&
                    <LinePlotComponent 
                        data={nestedData}
                        dimensions={dimensions}
                        hoveredIndex={hoveredIndex}
                        xKey={xKey}
                        yKey={yKey}
                        xLabel={xLabel}
                        yLabel={yLabel}
                        zLabel={zLabel}
                        title={title}
                        line={line}
                        zKey={zKey}
                        xScale={xScale}
                        yScale={yScale}
                        zScale={zScale}
                        selectedIndices={selectedIndices}
                        onClick={onClick}
                        onMouseEnter={onMouseEnter}
                    />
                }
            </div>
        </div>
    )
}
export default LinePlot;
