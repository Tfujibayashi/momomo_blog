import { Skeleton } from '@mui/material';

type SkeletonBoxProps = {
  height?: string | number;
  width?: string | number;
};

export const SkeletonBox = ({ width, height }: SkeletonBoxProps): JSX.Element => {
  return (
    <Skeleton
      sx={{ bgcolor: 'grey.600' }}
      animation="wave"
      variant="rectangular"
      width={width}
      height={height}
    />
  );
};
