import { useEffect } from 'react';

import { EditsList } from '@components/organisms/edits/edits-list';

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
  const { push } = useRoute();

  useEffect(() => {
    if (!user) {
      push('/');
    }
  }, [push, user]);

  useEffect(() => {
    void getContentList();
  }, [getContentList]);

  return (
    <div>
      <h2>記事一覧</h2>

      <EditsList />
    </div>
  );
};
