import { createContext, useCallback, useContext } from 'react';

import { useState, useToast } from '~/hooks';
import { Content, ContentId, ContentList } from '~/models';
import Repositories from '~/repositories';

export const useEdits = () => {
  const { ContentsRepository } = Repositories;

  const { showSuccessToast, showErrorToast } = useToast();

  const [state, setState] = useState({
    isListGetting: false,
    isGetting: false,
    isAdding: false,
    isDeleting: false,
    contentList: ContentList.empty(),
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

  const getContentList = useCallback(async () => {
    setState({
      isListGetting: true,
    });

    try {
      const contentList = await ContentsRepository.getContentList({ isActive: false });

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

  const addContent = useCallback(async () => {
    setState({
      isAdding: true,
    });

    try {
      const contentId = await ContentsRepository.addContent();

      showSuccessToast('新規作成しました');

      return contentId;
    } catch (e) {
      showErrorToast((e as Error).message);
    }

    setState({
      isAdding: false,
    });
  }, [ContentsRepository, showErrorToast, showSuccessToast]);

  const deleteContent = useCallback(
    async (contentId: ContentId, callBack?: () => Promise<void>) => {
      setState({
        isDeleting: true,
      });

      try {
        await ContentsRepository.deleteContent(contentId);

        showSuccessToast('記事を削除しました');

        callBack && (await callBack());
      } catch (e) {
        showErrorToast((e as Error).message);
      }

      setState({
        isDeleting: false,
      });
    },
    [ContentsRepository, showErrorToast, showSuccessToast],
  );

  const unDeleteContent = useCallback(
    async (contentId: ContentId, callBack?: () => Promise<void>) => {
      setState({
        isDeleting: true,
      });

      try {
        await ContentsRepository.unDeleteContent(contentId);

        showSuccessToast('記事を復元しました');

        callBack && (await callBack());
      } catch (e) {
        showErrorToast((e as Error).message);
      }

      setState({
        isDeleting: false,
      });
    },
    [ContentsRepository, showErrorToast, showSuccessToast],
  );

  return {
    ...state,
    getContent,
    getContentList,
    addContent,
    deleteContent,
    unDeleteContent,
  };
};

export type EditsContextStore = ReturnType<typeof useEdits>;
export const EditsContext = createContext<EditsContextStore | null>(null);
export const useEditsContext = (): EditsContextStore | null => useContext(EditsContext);
