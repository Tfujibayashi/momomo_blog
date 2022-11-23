import React, { useMemo } from 'react';

type SpacerProps = {
  direction?: 'horizontal' | 'vertical';
};

export const Spacer = ({ direction = 'vertical' }: SpacerProps): JSX.Element => {
  const height = useMemo(() => {
    return direction === 'vertical' ? 20 : 0;
  }, [direction]);

  const width = useMemo(() => {
    return direction === 'horizontal' ? 20 : 0;
  }, [direction]);

  return <div style={{ height, width }} />;
};
