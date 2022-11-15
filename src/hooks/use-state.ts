import { useCallback, useState as _useState } from 'react';

export const useState = <T>(
  _state: T,
): [T, (_state: Partial<{ [key in keyof T]: T[key] }>) => void] => {
  const [state, _setState] = _useState(_state);

  const setState = useCallback(
    (_state: Partial<{ [key in keyof typeof state]: typeof state[key] }>) => {
      _setState((prevState) => {
        return {
          ...prevState,
          ..._state,
        };
      });
    },
    [_setState],
  );

  return [state, setState];
};
