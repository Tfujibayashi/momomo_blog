import { ContentBox } from '@components/molecules';
import styles from '@styles/home.module.scss';

import { HomeContextStore, useHomeContext, useRoute } from '~/hooks';
import { ContentId } from '~/models';

export const HomeContent = (): JSX.Element => {
  const { contentList } = useHomeContext() as HomeContextStore;
  const { push } = useRoute();

  const handleClickContentBox = (contentId: ContentId): void => {
    push(contentId.value);
  };

  return (
    <div className={styles['home--content']}>
      {contentList.value.map((content, index) => (
        <div key={index} className={styles['home--content--item']}>
          <ContentBox
            title={content.props.title.value}
            imageUri={content.props.imagePath.value}
            onClick={(): void => handleClickContentBox(content.props.id)}
          />
        </div>
      ))}
    </div>
  );
};
