import { SkeletonBox } from '@components/molecules';
import styles from '@styles/home.module.scss';

export const HomeContentSkeleton = (): JSX.Element => {
  return (
    <div className={styles['home--content']}>
      {Array(9)
        .fill(0)
        .map((_, index) => (
          <SkeletonBox key={index} height={200} className={styles['home--content--item']} />
        ))}
    </div>
  );
};
