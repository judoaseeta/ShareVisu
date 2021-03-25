import React from 'react';
import { LabelProps } from './type';
// styles
import styles from './styles/label.module.scss';

const Title: React.FC<LabelProps> = ({
    dimensions,
    value
}) => 
<text
    className={styles.title}
    x={dimensions.width / 2}
    y={dimensions.marginTop / 2}
    alignmentBaseline="central"
>{value}</text>;

export default Title;
