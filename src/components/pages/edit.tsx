import { useEffect } from 'react';

import { EditForm } from '@components/organisms';

import { AuthContextStore, useAuthContext, useRoute } from '~/hooks';

export const Edit = (): JSX.Element => {
  const { user } = useAuthContext() as AuthContextStore;
  const { push } = useRoute();

  useEffect(() => {
    if (!user) {
      push('/');
    }
  }, [push, user]);

  return (
    <div>
      <EditForm />
    </div>
  );
};
