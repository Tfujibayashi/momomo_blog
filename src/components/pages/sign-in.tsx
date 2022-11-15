import { useEffect } from 'react';

import { SignInForm } from '@components/organisms';

import { AuthContextStore, useAuthContext, useRoute } from '~/hooks';

export const SignIn = (): JSX.Element => {
  const { user } = useAuthContext() as AuthContextStore;
  const { push } = useRoute();

  useEffect(() => {
    if (user) {
      push('/edit');
    }
  }, [user, push]);

  return (
    <div>
      <SignInForm />
    </div>
  );
};
