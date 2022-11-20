import { useCallback } from 'react';

import { useState, useToast } from '~/hooks';
import { Content, ContentText } from '~/models';
import Repositories from '~/repositories';

export const useEdit = () => {
  const { ContentsRepository } = Repositories;

  const { showErrorToast } = useToast();

  const [state, setState] = useState({
    isSaving: false,
    content: Content.empty(),
  });

  const [inputs, setInputs] = useState({
    markdownText: '',
  });

  const makeSaveContent = useCallback(() => {
    return state.content.assign({
      text: ContentText.create(inputs.markdownText),
    });
  }, [inputs.markdownText, state.content]);

  const saveContent = useCallback(async () => {
    setState({
      isSaving: true,
    });

    try {
      const content = makeSaveContent();

      await ContentsRepository.saveContent(content);
    } catch (e) {
      showErrorToast((e as Error).message);
    }

    setState({
      isSaving: false,
    });
  }, [ContentsRepository, makeSaveContent, showErrorToast]);

  return {
    ...state,
    setState,
    inputs,
    setInputs,
    saveContent,
  };
};
