import { EditListItemBox, Spacer } from '@components/molecules';
import styles from '@styles/edits.module.scss';

import { EditsContextStore, useEditsContext, useRoute } from '~/hooks';
import { ContentId } from '~/models';

export const EditsList = (): JSX.Element => {
  const { contentList, deleteContent } = useEditsContext() as EditsContextStore;
  const { push } = useRoute();

  const handleClickEditListItemBox = (contentId: ContentId): void => {
    push(contentId.value);
  };

  const handleClickDeleteIcon = (contentId: ContentId): void => {
    void deleteContent(contentId);
  };

  return (
    <div className={styles['edits--list']}>
      {contentList.value.map((content, index) => (
        <div key={index}>
          <EditListItemBox
            title={content.props.title.value}
            onClick={(): void => handleClickEditListItemBox(content.props.id)}
            onClickEditIcon={(): void => handleClickEditListItemBox(content.props.id)}
            onClickTrashIcon={(): void => handleClickDeleteIcon(content.props.id)}
          />

          <Spacer />
        </div>
      ))}
    </div>
  );
};
