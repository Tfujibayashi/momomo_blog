import { HomeContext, useHome } from '~/hooks';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const HomeProvider = ({ children }: Props): JSX.Element => {
  const context = useHome();

  return <HomeContext.Provider value={context}>{children}</HomeContext.Provider>;
};
