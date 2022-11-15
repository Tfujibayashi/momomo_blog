import React from 'react';

import { AuthContext, useAuth } from '~/hooks';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const AuthProvider = ({ children }: Props): JSX.Element => {
  const context = useAuth();

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};
