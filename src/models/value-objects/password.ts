import { EMPTY_STRING } from '~/constants';
import { ValueObject } from '~/models/common-class';
import Validator from '~/util/validator';

export class Password extends ValueObject<string> {
  static create(value: string): Password {
    // validation
    Password.validate(value);

    return new Password(value);
  }

  static validate(value: string): void {
    const validator = new Validator({ value: value, description: 'パスワード' });

    validator.string();
    validator.password();
  }

  static empty(): Password {
    return new Password(EMPTY_STRING);
  }

  copy(): Password {
    return new Password(this.value);
  }
}
