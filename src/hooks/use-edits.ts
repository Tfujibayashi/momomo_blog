import { createContext, useCallback, useContext } from 'react';

import { useState, useToast } from '~/hooks';
import { Content, ContentId, ContentList } from '~/models';
import Repositories from '~/repositories';

export const useEdits = () => {
  const { ContentsRepository } = Repositories;

  const { showErrorToast } = useToast();

  const [state, setState] = useState({
    isListGetting: false,
    isGetting: false,
    isDeleting: false,
    contentList: ContentList.empty(),
    content: Content.empty(),
  });

  const getContentList = useCallback(async () => {
    setState({
      isListGetting: true,
    });

    try {
      const contentList = await ContentsRepository.getContentList();

      setState({
        contentList,
      });
    } catch (e) {
      showErrorToast((e as Error).message);
    }
    setState({
      isListGetting: false,
    });
  }, [ContentsRepository, showErrorToast]);

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

  const deleteContent = useCallback(
    async (contentId: ContentId) => {
      setState({
        isDeleting: true,
      });

      try {
        await ContentsRepository.deleteContent(contentId);
      } catch (e) {
        showErrorToast((e as Error).message);
      }

      setState({
        isDeleting: false,
      });
    },
    [ContentsRepository, showErrorToast],
  );

  return {
    ...state,
    getContentList,
    getContent,
    deleteContent,
  };
};

export type EditsContextStore = ReturnType<typeof useEdits>;
export const EditsContext = createContext<EditsContextStore | null>(null);
export const useEditsContext = (): EditsContextStore | null => useContext(EditsContext);
