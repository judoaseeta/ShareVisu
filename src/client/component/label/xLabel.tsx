import React from 'react';
import { LabelProps } from './type';
import styles from './styles/label.module.scss';

const xLabel: React.FC<LabelProps> = ({
    value,
    dimensions
}) => 
<text 
className={`${styles.label} ${styles.x}`}
    x={dimensions.width - dimensions.marginRight}
    y={dimensions.height - dimensions.marginBottom + 27}
    alignmentBaseline="baseline"
>{value}</text>;

export default xLabel;

