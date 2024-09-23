import { Outlet } from 'react-router-dom';
import { HeaderBar } from './HeaderBar.jsx';
import { FooterBar } from './FooterBar.jsx';
import styles from './PageLayout.module.css'

export function PageLayout() {
  return (
    <>
      <header>
        <HeaderBar/>
      </header>
      <main className={styles.content}>
        <Outlet/>
      </main>
      <footer>
        <FooterBar/>
      </footer>
    </>
  );
}
