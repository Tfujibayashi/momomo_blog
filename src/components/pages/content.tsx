import { useEffect } from 'react';

import { ContentText } from '@components/organisms';
import styles from '@styles/content.module.scss';

import { ContentContextStore, useContentContext, useRoute } from '~/hooks';
import { ContentId } from '~/models';

export const Content = (): JSX.Element => {
  const { isGetting, contentId, setState, getContent } = useContentContext() as ContentContextStore;
  const { params } = useRoute();

  useEffect(() => {
    setState({
      contentId: ContentId.create(params.contentId as string),
    });
  }, [params, setState]);

  useEffect(() => {
    if (contentId.isNotEmpty) {
      void getContent();
    }
  }, [contentId.isNotEmpty, getContent]);

  return <div className={styles['content']}>{isGetting ? <>読み込み中</> : <ContentText />}</div>;
};
