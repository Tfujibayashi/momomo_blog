import { useEffect } from 'react';

import { EditsMenu } from '@components/organisms';
import { EditsList } from '@components/organisms/edits/edits-list';
import styles from '@styles/edits.module.scss';

import {
  AuthContextStore,
  EditsContextStore,
  useAuthContext,
  useEditsContext,
  useRoute,
} from '~/hooks';

export const Edits = (): JSX.Element => {
  const { user } = useAuthContext() as AuthContextStore;
  const { getContentList } = useEditsContext() as EditsContextStore;
  const { notFoundPage } = useRoute();

  useEffect(() => {
    void getContentList();
  }, [getContentList]);

  if (!user) {
    return notFoundPage();
  }

  return (
    <div className={styles['edits']}>
      <h2>記事一覧</h2>

      <div className={styles['edits__content']}>
        <EditsList />

        <EditsMenu />
      </div>
    </div>
  );
};
