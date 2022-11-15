import { EMPTY_STRING } from '~/constants';
import { ValueObject } from '~/models/common-class';
import Validator from '~/util/validator';

export class UserName extends ValueObject<string> {
  static create(value: string): UserName {
    // validation
    UserName.validate(value);

    return new UserName(value);
  }

  static validate(value: string): void {
    const validator = new Validator({ value: value, description: 'ユーザー名' });

    validator.string();
  }

  static empty(): UserName {
    return new UserName(EMPTY_STRING);
  }

  copy(): UserName {
    return new UserName(this.value);
  }
}
