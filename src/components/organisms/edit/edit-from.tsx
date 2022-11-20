import { useEffect } from 'react';

import { Markdown } from '@components/molecules';
import styles from '@styles/edit.module.scss';

import { useEdit, useRoute } from '~/hooks';
import { ContentId } from '~/models';

export const EditForm = (): JSX.Element => {
  const { inputs, setInputs, init } = useEdit();
  const { params } = useRoute();

  useEffect(() => {
    const contentId = ContentId.create(params.contentId as string);

    if (contentId.isNotEmpty) {
      void init(contentId);
    }
  }, [init, params.contentId]);

  const handleChangeMarkdownText = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInputs({
      markdownText: event.target.value,
    });
  };

  return (
    <div className={styles.edit}>
      <textarea value={inputs.markdownText} onChange={handleChangeMarkdownText} />

      <div className={styles['edit--preview']}>
        <Markdown markdownText={inputs.markdownText} />
      </div>
    </div>
  );
};
