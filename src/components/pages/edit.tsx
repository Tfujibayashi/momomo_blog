import { useEffect } from 'react';

import { AuthContextStore, useAuthContext, useRoute } from '~/hooks';

export const Edit = (): JSX.Element => {
  const { user } = useAuthContext() as AuthContextStore;
  const { push } = useRoute();

  useEffect(() => {
    if (!user) {
      push('/');
    }
  }, [push, user]);

  return <div>ここに編集ページ</div>;
};
