import { createContext, useCallback, useContext } from 'react';

import { useState, useToast } from '~/hooks';
import { Content, ContentId } from '~/models';
import Repositories from '~/repositories';

export const useContent = () => {
  const { ContentsRepository } = Repositories;

  const { showErrorToast } = useToast();

  const [state, setState] = useState({
    isGetting: false,
    contentId: ContentId.empty(),
    content: Content.empty(),
  });

  const getContent = useCallback(async () => {
    setState({
      isGetting: true,
    });

    try {
      const content = await ContentsRepository.getContent(state.contentId);

      setState({
        content,
      });
    } catch (e) {
      showErrorToast((e as Error).message);
    }
    setState({
      isGetting: false,
    });
  }, [ContentsRepository, showErrorToast, state.contentId]);

  return {
    ...state,
    setState,
    getContent,
  };
};

export type ContentContextStore = ReturnType<typeof useContent>;
export const ContentContext = createContext<ContentContextStore | null>(null);
export const useContentContext = (): ContentContextStore | null => useContext(ContentContext);
