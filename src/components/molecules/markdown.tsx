import { useMemo } from 'react';

import { marked } from 'marked';

import 'github-markdown-css/github-markdown-light.css';

type MarkdownProps = {
  markdownText: string;
};

export const Markdown = ({ markdownText }: MarkdownProps): JSX.Element => {
  const __html = useMemo(() => {
    return marked(markdownText);
  }, [markdownText]);

  return <div className="markdown-body" dangerouslySetInnerHTML={{ __html }} style={style} />;
};

const style: React.CSSProperties = {
  paddingTop: 20,
  paddingBottom: 20,
  paddingLeft: 40,
  paddingRight: 40,
};
