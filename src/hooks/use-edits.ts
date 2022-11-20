import { createContext, useCallback, useContext } from 'react';

import { useState, useToast } from '~/hooks';
import { ContentList } from '~/models';
import Repositories from '~/repositories';

export const useEdits = () => {
  const { ContentsRepository } = Repositories;

  const { showErrorToast } = useToast();

  const [state, setState] = useState({
    isGetting: false,
    contentList: ContentList.empty(),
  });

  const getContentList = useCallback(async () => {
    setState({
      isGetting: true,
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
      isGetting: false,
    });
  }, [ContentsRepository, showErrorToast]);

  return {
    ...state,
    getContentList,
  };
};

export type EditsContextStore = ReturnType<typeof useEdits>;
export const EditsContext = createContext<EditsContextStore | null>(null);
export const useEditsContext = (): EditsContextStore | null => useContext(EditsContext);
