import { Link } from 'react-router-dom';

import styles from '@styles/header.module.scss';

export const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <h1 className={styles.header__title}>
          <Link to="/">ももものブログ</Link>
        </h1>
      </div>
    </header>
  );
};
