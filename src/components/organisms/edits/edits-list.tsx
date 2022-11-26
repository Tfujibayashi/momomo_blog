import { EditListItemBox, Spacer } from '@components/molecules';
import styles from '@styles/edits.module.scss';

import { EditsContextStore, useEditsContext, useRoute } from '~/hooks';
import { Content } from '~/models';

export const EditsList = (): JSX.Element => {
  const {
    contentList,
    getContentList,
    deleteContent,
    unDeleteContent,
    publishContent,
    unPublishContent,
    uploadThumbnail,
  } = useEditsContext() as EditsContextStore;
  const { push } = useRoute();

  const handleClickEditListItemBox = (content: Content): void => {
    push(content.props.id.value);
  };

  const handleClickCameraIcon = (file: File, content: Content): void => {
    void uploadThumbnail(content.props.id, file);
  };

  const handleClickDeleteIcon = (content: Content): void => {
    void deleteContent(content.props.id, getContentList);
  };

  const handleClickRecycleIcon = (content: Content): void => {
    void unDeleteContent(content.props.id, getContentList);
  };

  const handleClickPublicIcon = (content: Content): void => {
    void publishContent(content.props.id, getContentList);
  };

  const handleClickUnPublicIcon = (content: Content): void => {
    void unPublishContent(content.props.id, getContentList);
  };

  return (
    <div className={styles['edits--list']}>
      {contentList.value.map((content, index) => (
        <div key={index}>
          <EditListItemBox<Content>
            item={content}
            title={content.props.title.value}
            imagePath={content.props.imagePath.value}
            isDeleted={!content.isActive}
            isPublic={content.props.isPublic}
            onClick={handleClickEditListItemBox}
            onClickCameraIcon={handleClickCameraIcon}
            onClickPublicIcon={handleClickPublicIcon}
            onClickUnPublicIcon={handleClickUnPublicIcon}
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
