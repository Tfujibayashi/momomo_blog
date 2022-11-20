import { useCallback, useEffect } from 'react';

import { useState } from '~/hooks';

export const useKey = () => {
  const [state, setState] = useState({
    key: '' as KeyboardEvent['key'],
    onKeyDown: null as unknown as () => void,
    ctrlKey: true,
  });

  const keyBind = useCallback((key: KeyboardEvent['key'], onKeyDown: () => void) => {
    setState({
      key,
      onKeyDown,
    });
  }, []);

  useEffect(() => {
    const eventListener = (event: KeyboardEvent) => {
      if (state.ctrlKey && !event.ctrlKey) return;
      if (event.key !== state.key) return;

      event.preventDefault();

      state.onKeyDown();
    };

    window.addEventListener('keydown', eventListener);

    return () => window.removeEventListener('keydown', eventListener);
  }, [state]);

  return {
    keyBind,
  };
};
