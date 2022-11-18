import { Content, ContentList } from '~/models';
import { ContentEntity } from '~/repositories/db';

export class ContentsParser {
  parseContentList(contentList: ContentList): ContentEntity[] {
    return contentList.value.map((content) => {
      return this.parseContent(content);
    });
  }

  parseContent(content: Content): ContentEntity {
    const { title, text, imagePath, createdAt, updatedAt, deletedAt } = content.props;

    return {
      title: title.value,
      text: text.value,
      imagePath: imagePath.value,
      createdAt: createdAt.timeStamp,
      updatedAt: updatedAt.timeStamp,
      deletedAt: deletedAt.timeStamp,
    };
  }
}
