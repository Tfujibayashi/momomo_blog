import { useEffect } from 'react';

import { HomeContent, HomeContentSkeleton } from '@components/organisms';
import styles from '@styles/home.module.scss';

import { HomeContextStore, useHomeContext } from '~/hooks';

export const Home = (): JSX.Element => {
  const { isGetting, getContentList } = useHomeContext() as HomeContextStore;

  useEffect(() => {
    void getContentList();
  }, [getContentList]);

  return (
    <div className={styles['home']}>
      <p>ポートフォリオを兼ねた自作ブログです。</p>

      {isGetting ? <HomeContentSkeleton /> : <HomeContent />}
    </div>
  );
};
