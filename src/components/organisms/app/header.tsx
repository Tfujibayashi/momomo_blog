import { Link } from 'react-router-dom';

import { Button } from '@components/molecules';
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
          <div className={styles.header__button}>
            <Link to="/edit">
              <Button label="記事を書く" />
            </Link>

            <Button label="サインアウト" onClick={handleClickSignOut} />
          </div>
        ) : (
          <Link to="/sign-in">
            <Button label="サインイン" />
          </Link>
        )}
      </div>
    </header>
  );
};
