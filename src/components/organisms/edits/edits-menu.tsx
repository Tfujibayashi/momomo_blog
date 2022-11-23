import { Button } from '@components/molecules';

import { EditsContextStore, useEditsContext, useRoute } from '~/hooks';

export const EditsMenu = (): JSX.Element => {
  const { addContent } = useEditsContext() as EditsContextStore;
  const { push } = useRoute();

  const makeNewContent = async (): Promise<void> => {
    const contentId = await addContent();

    if (contentId) {
      push(contentId.value);
    }
  };

  const handleClickNewButton = (): void => {
    void makeNewContent();
  };

  return <Button label="新規作成" onClick={handleClickNewButton} />;
};
