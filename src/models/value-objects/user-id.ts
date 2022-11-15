import { EMPTY_NUMBER } from '~/constants';
import { Id } from '~/models/value-objects/id';

export class UserId extends Id {
  static create(value: number): UserId {
    UserId.validate(value, 'ユーザーID');

    return new UserId(value);
  }

  static empty(): UserId {
    return new UserId(EMPTY_NUMBER);
  }

  copy(): UserId {
    return new UserId(this.value);
  }
}
