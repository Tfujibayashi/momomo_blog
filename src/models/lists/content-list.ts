import { Content, EntityList } from '~/models';

export class ContentList extends EntityList<Content> {
  static create(contents: Content[] = []): ContentList {
    return new ContentList(contents);
  }

  static empty(): ContentList {
    return new ContentList([]);
  }

  copy(): ContentList {
    return new ContentList(this.value);
  }
}
