import { EditListItemBox } from '@components/molecules';

import { EditsContextStore, useEditsContext, useRoute } from '~/hooks';
import { ContentId } from '~/models';

export const EditsList = (): JSX.Element => {
  const { contentList } = useEditsContext() as EditsContextStore;
  const { push } = useRoute();

  const onClickEditListItemBox = (contentId: ContentId): void => {
    push(contentId.value);
  };

  return (
    <div>
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
