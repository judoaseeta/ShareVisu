import React from 'react';
import HelmetComponent from '../component/helmet';
import Summaries from './plotViews/summaries';

import styles from './styles/main.module.scss';


const Main: React.FC = () => 
<main
    className={styles.main}
>
    <HelmetComponent
        title="Sharevisu - 당신의 데이터 비쥬얼라이제이션을 나눠요"
        description="다양한 형태의 플랏을 만들고, 그것을 웹 상에서 다른 유저들과 공유할 수 있습니다."
    />
    <h1
        className={styles.heading}
    >ShareVisu 유저들이 만든 플랏들</h1 >
    <section>
        <Summaries /> 
    </section>
</main>

export default Main;
