import { Skeleton } from '@mui/material';

type SkeletonBoxProps = {
  height?: string | number;
  width?: string | number;
  className?: string;
};

export const SkeletonBox = ({ width, height, className }: SkeletonBoxProps): JSX.Element => {
  return (
    <Skeleton
      sx={{ bgcolor: 'grey.600' }}
      animation="wave"
      variant="rectangular"
      width={width}
      height={height}
      className={className}
    />
  );
};
