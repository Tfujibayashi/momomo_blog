import { EditsContext, useEdits } from '~/hooks';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const EditsProvider = ({ children }: Props): JSX.Element => {
  const context = useEdits();

  return <EditsContext.Provider value={context}>{children}</EditsContext.Provider>;
};
