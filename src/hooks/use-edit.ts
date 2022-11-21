import { useCallback } from 'react';

import { useState, useToast } from '~/hooks';
import { Content, ContentText, ContentTitle } from '~/models';
import Repositories from '~/repositories';

export const useEdit = () => {
  const { ContentsRepository } = Repositories;

  const { showSuccessToast, showErrorToast } = useToast();

  const [state, setState] = useState({
    isSaving: false,
    content: Content.empty(),
  });

  const [inputs, setInputs] = useState({
    title: '',
    text: '',
  });

  const init = useCallback(
    (content: Content) => {
      setState({
        content,
      });

      setInputs({
        title: content.props.title.value,
        text: content.props.text.value,
      });
    },
    [setInputs, setState],
  );

  const makeSaveContent = useCallback(() => {
    return state.content.assign({
      title: ContentTitle.create(inputs.title),
      text: ContentText.create(inputs.text),
    });
  }, [inputs.text, inputs.title, state.content]);

  const saveContent = useCallback(async () => {
    setState({
      isSaving: true,
    });

    try {
      const content = makeSaveContent();

      await ContentsRepository.saveContent(content);

      showSuccessToast('保存しました');
    } catch (e) {
      showErrorToast((e as Error).message);
    }

    setState({
      isSaving: false,
    });
  }, [ContentsRepository, makeSaveContent, showErrorToast, showSuccessToast]);

  return {
    ...state,
    setState,
    inputs,
    setInputs,
    init,
    saveContent,
  };
};
