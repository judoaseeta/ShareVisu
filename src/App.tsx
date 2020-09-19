import React from 'react';
// import 
import './style/app.scss';
import styles from './style/app.module.scss';

const App: React.FC<{}> = () =>
<article className="app">
    <section>
        <h1 
            className={styles.title}
            data-testid={'title'}
        >Roy's React SSR Boilerplate</h1>
        <a href="https://github.com/judoaseeta/reactSSR" target="_blink">Go to the Github repository </a>
    </section>
</article>;

export default App;
