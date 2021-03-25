import React from 'react';
import { Link }from 'react-router-dom';
import { PlotSummary } from '../../api';
import plotTypeToText from '../../utils/plotTypeToText';
import styles from './styles/summary.module.scss';
export interface SummaryProps {
    plot: PlotSummary;
}
const Summary:React.FC<SummaryProps> = ({
    plot
}) => 
<Link
    className={styles.container}
    to={`/plot/${plot.SK}`}
>
<li>
    
        <div>
            <h3>{plot.title}</h3>
            <p>{plotTypeToText(plot.plotType)}</p>
            <p>{new Date(plot.created).toLocaleString()}</p>
        </div>
</li>
</Link>;

export default Summary;

