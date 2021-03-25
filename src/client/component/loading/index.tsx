import React from 'react';

import classnames from 'classnames/bind';
import styles from './styles/loading.module.scss';

const cx = classnames.bind(styles);

export interface LoadingProps {
    isLoading: boolean;
    isFull?: boolean;
    message: string;
}
const Loading: React.FC<LoadingProps> = ({
    isFull,
    isLoading,
    message
}) => 
<div
    className={cx('container',{
        on: isLoading,
        full: isFull
    })}
>
    <h3>{message}</h3>
</div>;

export default Loading;