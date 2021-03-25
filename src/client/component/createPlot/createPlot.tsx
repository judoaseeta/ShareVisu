import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles/createPlot.module.scss';


const plots = [
    {
        name: '스캐터 플랏',
        path: 'scatter'
    },
    {
        name: '라인 플랏',
        path: 'line',
        unavailable: true,
    },
    {
        name: '박스 플랏',
        path: 'box',
        unavailable: true,
    },
    {
        name: '바 차트',
        path: 'bar',
        unavailable: true,
    }
]
const CreatePlot: React.FC = () => 
<div
    className={styles.container}
>
    <h1>제작하길 원하는 플랏을 선택하세요.</h1>
    <ul
        className={styles.plotList}
    >
        {
            plots.map(({ name, path, unavailable }) => 
              !unavailable ?
                <Link
                    className={styles.plotItem}
                    to={`/createPlot/${path}`}
                >
                    <li>{name}</li>
                </Link> 
                : <li
                    className={`${styles.plotItem} ${styles.unavailable}`}
                >{name}</li>
            )
        }
    </ul>
</div>

export default CreatePlot;
