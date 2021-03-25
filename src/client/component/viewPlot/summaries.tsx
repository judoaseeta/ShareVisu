import React from 'react';
import Summary from './summary';
import { PlotSummary } from '../../api';

import styles from './styles/summaries.module.scss';

export interface PlotSummariesProps {
    plots: PlotSummary[];
}
const Summaries: React.FC<PlotSummariesProps> = ({
    plots
}) =>
<ul
    className={styles.list}
>
    {
        plots.map( plot => 
            <Summary 
                plot={plot}
                key={plot.SK}
            />
        )
    }
</ul>;

export default Summaries;


