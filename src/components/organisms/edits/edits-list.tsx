import { EditListItemBox, Spacer } from '@components/molecules';
import styles from '@styles/edits.module.scss';

import { EditsContextStore, useEditsContext, useRoute } from '~/hooks';
import { Content } from '~/models';

export const EditsList = (): JSX.Element => {
  const { contentList, getContentList, deleteContent, unDeleteContent } =
    useEditsContext() as EditsContextStore;
  const { push } = useRoute();

  const handleClickEditListItemBox = (content: Content): void => {
    push(content.props.id.value);
  };

  const handleClickDeleteIcon = (content: Content): void => {
    void deleteContent(content.props.id, getContentList);
  };

  const handleClickRecycleIcon = (content: Content): void => {
    void unDeleteContent(content.props.id, getContentList);
  };

  return (
    <div className={styles['edits--list']}>
      {contentList.value.map((content, index) => (
        <div key={index}>
          <EditListItemBox<Content>
            item={content}
            title={content.props.title.value}
            isDeleted={!content.isActive}
            onClick={handleClickEditListItemBox}
            onClickEditIcon={handleClickEditListItemBox}
            onClickTrashIcon={handleClickDeleteIcon}
            onClickRecycleIcon={handleClickRecycleIcon}
          />

          <Spacer />
        </div>
      ))}
    </div>
  );
};
