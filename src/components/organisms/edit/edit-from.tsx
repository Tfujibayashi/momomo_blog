import { useCallback, useEffect } from 'react';

import { Markdown } from '@components/molecules';
import styles from '@styles/edit.module.scss';

import { EditsContextStore, useEdit, useEditsContext, useKey } from '~/hooks';

export const EditForm = (): JSX.Element => {
  const { content } = useEditsContext() as EditsContextStore;
  const { inputs, setInputs, init, saveContent } = useEdit();
  const { keyBind } = useKey();

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs({
      title: event.target.value,
    });
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInputs({
      text: event.target.value,
    });
  };

  const handleOnPressSaveShortCutKey = useCallback(() => {
    void saveContent();
  }, [saveContent]);

  useEffect(() => {
    keyBind('s', handleOnPressSaveShortCutKey);
  }, [handleOnPressSaveShortCutKey, keyBind]);

  useEffect(() => {
    init(content);
  }, [content, init]);

  return (
    <div>
      <input
        className={styles['edit__title']}
        placeholder="タイトル"
        value={inputs.title}
        onChange={handleChangeTitle}
      />

      <div className={styles['edit__form']}>
        <textarea value={inputs.text} onChange={handleChangeText} />

        <div className={styles['edit__form__preview']}>
          <Markdown markdownText={inputs.text} />
        </div>
      </div>
    </div>
  );
};
