import { EMPTY_STRING } from '~/constants';
import { Id } from '~/models/value-objects/id';

export class UserId extends Id {
  static create(value: string): UserId {
    UserId.validate(value, 'ユーザーID');

    return new UserId(value);
  }

  static empty(): UserId {
    return new UserId(EMPTY_STRING);
  }

  copy(): UserId {
    return new UserId(this.value);
  }
}
