import { PropsWithChildren, ReactElement } from 'react';
import logo from './../../assets/logo.svg';

import styles from './layout.module.css';

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <header className={styles.header}>
                <nav aria-label="Site Navigation" className={styles.navigation}>
                    <img src={logo} className={styles.logo} />
                    <div className={styles.devices}>Devices</div>
                    <div className={styles.account}>RM</div>
                </nav>
            </header>
            <main>
                <div className={styles.page}>
                    {children}
                </div>
            </main>
        </>
    );
};

export default Layout;