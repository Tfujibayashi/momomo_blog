import { EMPTY_NUMBER } from '~/constants';
import { Id } from '~/models/value-objects/id';

export class ContentId extends Id {
  static create(value: number): ContentId {
    ContentId.validate(value, 'ユーザーID');

    return new ContentId(value);
  }

  static empty(): ContentId {
    return new ContentId(EMPTY_NUMBER);
  }

  copy(): ContentId {
    return new ContentId(this.value);
  }
}
