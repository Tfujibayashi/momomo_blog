import { Content, ContentId, ContentText, ContentTitle, DateTime, ImagePath } from '~/models';
import { ContentEntity } from '~/repositories/db';

export class ContentsMapper {
  mapContent(entity: ContentEntity, id: string): Content {
    const { title, text, imagePath, createdAt, updatedAt, deletedAt } = entity;

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
