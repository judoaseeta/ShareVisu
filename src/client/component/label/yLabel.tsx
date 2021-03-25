import React from 'react';
import { LabelProps } from './type';
import styles from './styles/label.module.scss';

const yLabel: React.FC<LabelProps> = ({
    value,
    dimensions
}) => 
<text 
    className={`${styles.label} ${styles.y}`}
    x={dimensions.marginLeft}
    y={dimensions.marginTop}
    transform={`rotate(-90,${dimensions.marginLeft - 5},${dimensions.marginTop})`}
>{value}</text>;

export default yLabel;