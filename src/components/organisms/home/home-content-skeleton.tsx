import { SkeletonBox } from '@components/molecules';
import styles from '@styles/home.module.scss';

export const HomeContentSkeleton = (): JSX.Element => {
  return (
    <div className={styles['home__content']}>
      {Array(9)
        .fill(0)
        .map((_, index) => (
          <div key={index} className={styles['home__content__item']}>
            <SkeletonBox height={200} width={300} />
          </div>
        ))}
    </div>
  );
};
