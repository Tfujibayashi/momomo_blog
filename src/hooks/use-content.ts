import { createContext, useCallback, useContext } from 'react';

import { useState, useToast } from '~/hooks';
import { Content, ContentId } from '~/models';
import Repositories from '~/repositories';

export const useContent = () => {
  const { ContentsRepository } = Repositories;

  const { showErrorToast } = useToast();

  const [state, setState] = useState({
    isGetting: false,
    content: Content.empty(),
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

  return {
    ...state,
    setState,
    getContent,
  };
};

export type ContentContextStore = ReturnType<typeof useContent>;
export const ContentContext = createContext<ContentContextStore | null>(null);
export const useContentContext = (): ContentContextStore | null => useContext(ContentContext);
