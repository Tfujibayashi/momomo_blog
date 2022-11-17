import { createContext, useCallback, useContext } from 'react';

import { useState, useToast } from '~/hooks';
import { ContentList } from '~/models';
import Repositories from '~/repositories';

export const useHome = () => {
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
      const contentList = await ContentsRepository.getContents();

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

export type HomeContextStore = ReturnType<typeof useHome>;
export const HomeContext = createContext<HomeContextStore | null>(null);
export const useHomeContext = (): HomeContextStore | null => useContext(HomeContext);
