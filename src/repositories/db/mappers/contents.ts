import {
  Content,
  ContentId,
  ContentList,
  ContentText,
  ContentTitle,
  DateTime,
  ImagePath,
} from '~/models';
import { ContentEntity } from '~/repositories/db';

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
      id: id ? ContentId.create(id) : ContentId.empty(),
      title: ContentTitle.create(title as string),
      text: ContentText.create(text),
      imagePath: imagePath ? ImagePath.create(imagePath) : ImagePath.empty(),
      createdAt: DateTime.create(createdAt.toDate()),
      updatedAt: DateTime.create(updatedAt.toDate()),
      deletedAt: deletedAt ? DateTime.create(deletedAt.toDate()) : DateTime.empty(),
    });
  }
}
