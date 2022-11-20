import { useCallback, useEffect } from 'react';

import { Markdown } from '@components/molecules';
import styles from '@styles/edit.module.scss';

import { EditsContextStore, useEdit, useEditsContext, useKey } from '~/hooks';

export const EditForm = (): JSX.Element => {
  const { content } = useEditsContext() as EditsContextStore;
  const { inputs, setState, setInputs, saveContent } = useEdit();
  const { keyBind } = useKey();

  const init = useCallback(() => {
    setState({
      content,
    });

    setInputs({
      markdownText: content.props.text.value,
    });
  }, [content, setInputs, setState]);

  useEffect(() => {
    init();
  }, [init]);

  const handleChangeMarkdownText = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInputs({
      markdownText: event.target.value,
    });
  };

  const handleOnPressSaveShortCutKey = useCallback(() => {
    void saveContent();
  }, [saveContent]);

  useEffect(() => {
    keyBind('s', handleOnPressSaveShortCutKey);
  }, [handleOnPressSaveShortCutKey, keyBind]);

  return (
    <div className={styles.edit}>
      <textarea value={inputs.markdownText} onChange={handleChangeMarkdownText} />

      <div className={styles['edit--preview']}>
        <Markdown markdownText={inputs.markdownText} />
      </div>
    </div>
  );
};
