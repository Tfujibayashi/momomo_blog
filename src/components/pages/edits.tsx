import { useEffect } from 'react';

import { EditListItemBox } from '@components/molecules';

import {
  AuthContextStore,
  EditsContextStore,
  useAuthContext,
  useEditsContext,
  useRoute,
} from '~/hooks';
import { ContentId } from '~/models';

export const Edits = (): JSX.Element => {
  const { user } = useAuthContext() as AuthContextStore;
  const { contentList, getContentList } = useEditsContext() as EditsContextStore;
  const { push } = useRoute();

  const onClickEditListItemBox = (contentId: ContentId): void => {
    push(contentId.value);
  };

  useEffect(() => {
    if (!user) {
      push('/');
    }
  }, [push, user]);

  useEffect(() => {
    void getContentList();
  }, [getContentList]);

  return (
    <div>
      <h2>記事一覧</h2>

      {contentList.value.map((content, index) => (
        <EditListItemBox
          key={index}
          title={content.props.title.value}
          onClick={(): void => onClickEditListItemBox(content.props.id)}
        />
      ))}
    </div>
  );
};
