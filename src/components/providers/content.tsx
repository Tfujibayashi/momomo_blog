import { ContentContext, useContent } from '~/hooks';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const ContentProvider = ({ children }: Props): JSX.Element => {
  const context = useContent();

  return <ContentContext.Provider value={context}>{children}</ContentContext.Provider>;
};
