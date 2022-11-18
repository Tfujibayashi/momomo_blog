import { ContentEntity } from '~/repositories/db';
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
  mapContentList(entities: ContentEntity[]): ContentList {
    const contents = entities.map((entity) => {
      return this.mapContent(entity);
    });

    return ContentList.create(contents);
  }

  mapContent(entity: ContentEntity): Content {
    const { id, title, text, imagePath, createdAt, updatedAt, deletedAt } = entity;

    return Content.create({
      id: ContentId.create(id),
      title: ContentTitle.create(title),
      text: ContentText.create(text),
      imagePath: ImagePath.create(imagePath),
      createdAt: DateTime.create(createdAt.toDate()),
      updatedAt: DateTime.create(updatedAt.toDate()),
      deletedAt: DateTime.create(deletedAt.toDate()),
    });
  }
}
