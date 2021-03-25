import React from 'react';
import Summaries from './plotViews/summaries';

import styles from './styles/main.module.scss';


const Main: React.FC = () => 
<main
    className={styles.main}
>
    <h1
        className={styles.heading}
    >ShareVisu 유저들이 만든 플랏들</h1 >
    <section>
        <Summaries /> 
    </section>
</main>

export default Main;
