import { useCallback } from 'react';

import { useState, useToast } from '~/hooks';
import { Content, ContentId } from '~/models';
import Repositories from '~/repositories';

export const useEdit = () => {
  const { ContentsRepository } = Repositories;

  const { showErrorToast } = useToast();

  const [state, setState] = useState({
    isGetting: false,
    content: Content.empty(),
  });

  const [inputs, setInputs] = useState({
    markdownText: '',
  });

  const getContent = useCallback(
    async (contentId: ContentId) => {
      setState({
        isGetting: true,
      });

      try {
        const content = await ContentsRepository.getContent(contentId);

        setState({
          content,
        });
      } catch (e) {
        showErrorToast((e as Error).message);
      }
      setState({
        isGetting: false,
      });
    },
    [ContentsRepository, showErrorToast],
  );

  const init = useCallback(
    async (contentId: ContentId) => {
      await getContent(contentId);

      setInputs({
        markdownText: state.content.props.text.value,
      });
    },
    [getContent, state.content.props.text.value],
  );

  return {
    ...state,
    setState,
    inputs,
    setInputs,
    getContent,
    init,
  };
};
