import React from 'react';
import LinePlot from '../../pages/plots/linePlot';
import ScatterPlot from '../../pages/plots/scatterPlot';
import { Plot } from '../../api';
import styles from './styles/plotView.module.scss';

export interface PlotViewProps {
    plot: Plot;
    onBack: React.MouseEventHandler;
}
const PlotView: React.FC<PlotViewProps> = ({
    plot,
    onBack
}) => 
<section
    className={styles.container}
>
    <header
        className={styles.header}
    >
        <button
            className={styles.goback}
            onClick={onBack}
        >
            돌아가기
        </button>
    </header>
    <main
        className={styles.view}
    >
        {
            plot.plotType === 'scatter' &&
            <ScatterPlot
                {...plot}
            /> 
        }
        {
            plot.plotType === 'line' &&
            <LinePlot 
                {...plot}
            />
        }
    </main>
</section>
export default PlotView;
