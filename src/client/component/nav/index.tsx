import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './styles/nav.module.scss';

const Nav: React.FC = () => {

    return <nav
        className={styles.container}
    >
        <ul
            className={styles.navList}
        >
            <NavLink
                activeClassName={`${styles.navItem} ${styles.active}`}
                className={styles.navItem}
                exact
                to="/"
            >
                <li>홈</li>
            </NavLink>
            <NavLink
                activeClassName={`${styles.navItem} ${styles.active}`}
                className={styles.navItem}
                to="/createplot"
            >
                <li>플랏 만들기</li>
            </NavLink>
        </ul>
    </nav>
}

export default Nav;

