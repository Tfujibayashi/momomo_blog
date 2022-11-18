import { SkeletonBox } from '@components/molecules';
import styles from '@styles/home.module.scss';

import { HomeContextStore, useHomeContext } from '~/hooks';

export const HomeContent = (): JSX.Element => {
  const { contentList } = useHomeContext() as HomeContextStore;

  return (
    <div className={styles['home--content']}>
      {contentList.value.map((_, index) => (
        <SkeletonBox key={index} height={200} className={styles['home--content--item']} />
      ))}
    </div>
  );
};
