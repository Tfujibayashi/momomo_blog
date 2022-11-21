import React, { useMemo } from 'react';

type Props = {
  direction?: 'horizontal' | 'vertical';
};

export const Spacer: React.FC<Props> = ({ direction = 'vertical' }) => {
  const height = useMemo(() => {
    return direction === 'vertical' ? 20 : 0;
  }, [direction]);

  const width = useMemo(() => {
    return direction === 'horizontal' ? 20 : 0;
  }, [direction]);

  return <div style={{ height, width }} />;
};
