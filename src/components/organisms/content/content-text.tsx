import { Markdown } from '@components/molecules';

import { ContentContextStore, useContentContext } from '~/hooks';

export const ContentText = (): JSX.Element => {
  const { content } = useContentContext() as ContentContextStore;

  return (
    <div className="markdown">
      <Markdown markdownText={content.props.text.value} />
    </div>
  );
};
