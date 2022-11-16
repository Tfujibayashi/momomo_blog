import { ContentEntity } from '~/api';
import {
  Content,
  ContentId,
  ContentList,
  ContentText,
  ContentTitle,
  DateTime,
  ImagePath,
} from '~/models';

export class ContentsMapper {
  transformToContentList(entities: ContentEntity[]): ContentList {
    const contents = entities.map((entity) => {
      return this.transformToContent(entity);
    });

    return ContentList.create(contents);
  }

  transformToContent(entity: ContentEntity): Content {
    const { id, title, text, imagePath, createdAt, updatedAt, deletedAt } = entity;

    return Content.create({
      id: ContentId.create(id),
      title: ContentTitle.create(title),
      text: ContentText.create(text),
      imagePath: ImagePath.create(imagePath),
      createdAt: DateTime.create(createdAt),
      updatedAt: DateTime.create(updatedAt),
      deletedAt: DateTime.create(deletedAt),
    });
  }
}
