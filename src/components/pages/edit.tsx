import { useEffect } from 'react';

import { Markdown } from '@components/molecules';
import styles from '@styles/edit.module.scss';

import { AuthContextStore, useAuthContext, useEdit, useRoute } from '~/hooks';

export const Edit = (): JSX.Element => {
  const { user } = useAuthContext() as AuthContextStore;
  const { push } = useRoute();
  const { inputs, setInputs } = useEdit();

  useEffect(() => {
    if (!user) {
      push('/');
    }
  }, [push, user]);

  const handleChangeMarkdownText = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInputs({
      markdownText: event.target.value,
    });
  };

  return (
    <div>
      <div className={styles.edit}>
        <textarea value={inputs.markdownText} onChange={handleChangeMarkdownText} />

        <div className={styles['edit--preview']}>
          <Markdown markdownText={inputs.markdownText} />
        </div>
      </div>
    </div>
  );
};
