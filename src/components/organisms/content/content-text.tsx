import { ContentContextStore, useContentContext } from '~/hooks';

export const ContentText = (): JSX.Element => {
  const { content } = useContentContext() as ContentContextStore;

  return <div>{content.props.text.value}</div>;
};
