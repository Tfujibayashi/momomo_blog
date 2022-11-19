import { useState } from '~/hooks';

export const useEdit = () => {
  const [state, setState] = useState({
    previewText: '',
  });

  const [inputs, setInputs] = useState({
    markdownText: '',
  });

  return {
    ...state,
    setState,
    inputs,
    setInputs,
  };
};
