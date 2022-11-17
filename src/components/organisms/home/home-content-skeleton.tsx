import { SkeletonBox } from '@components/molecules';
import styles from '@styles/home.module.scss';

export const HomeContentSkeleton = (): JSX.Element => {
  return (
    <div className={styles['home-content-skeleton-wrapper']}>
      <SkeletonBox height={200} className={styles['home-content-skeleton-wrapper-item']} />

      <SkeletonBox height={200} width={300} />

      <SkeletonBox height={200} width={300} />

      <SkeletonBox height={200} width={300} />

      <SkeletonBox height={200} width={300} />

      <SkeletonBox height={200} width={300} />

      <SkeletonBox height={200} width={300} />

      <SkeletonBox height={200} width={300} />

      <SkeletonBox height={200} width={300} />
    </div>
  );
};
