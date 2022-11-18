import { EMPTY_STRING } from '~/constants';
import { Id } from '~/models/value-objects/id';

export class ContentId extends Id {
  static create(value: string): ContentId {
    ContentId.validate(value, 'ユーザーID');

    return new ContentId(value);
  }

  static empty(): ContentId {
    return new ContentId(EMPTY_STRING);
  }

  copy(): ContentId {
    return new ContentId(this.value);
  }
}
