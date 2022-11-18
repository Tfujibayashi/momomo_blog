import { ContentEntity } from '~/repositories/db';
import { Content, ContentList } from '~/models';

export class ContentsParser {
  parseContentList(contentList: ContentList): ContentEntity[] {
    return contentList.value.map((content) => {
      return this.parseContent(content);
    });
  }

  parseContent(content: Content): ContentEntity {
    const { id, title, text, imagePath, createdAt, updatedAt, deletedAt } = content.props;

    return {
      id: id.value,
      title: title.value,
      text: text.value,
      imagePath: imagePath.value,
      createdAt: createdAt.timeStamp,
      updatedAt: updatedAt.timeStamp,
      deletedAt: deletedAt.timeStamp,
    };
  }
}
