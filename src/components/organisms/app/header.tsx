import { Link } from 'react-router-dom';

import styles from '@styles/header.module.scss';

import { AuthContextStore, useAuthContext } from '~/hooks';

export const Header = (): JSX.Element => {
  const { user, signOut } = useAuthContext() as AuthContextStore;

  const handleClickSignOut = (): void => {
    void signOut();
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <h1 className={styles.header__title}>
          <Link to="/">ももものブログ</Link>
        </h1>

        {user ? (
          <div>
            <p>
              <Link to="/edit">記事を書く</Link>
            </p>
            <p>
              <a onClick={handleClickSignOut}>サインアウト</a>
            </p>
          </div>
        ) : (
          <p>
            <Link to="/sign-in">サインイン</Link>
          </p>
        )}
      </div>
    </header>
  );
};
