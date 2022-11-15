import { EMPTY_STRING } from '~/constants';
import { ValueObject } from '~/models/common-class';
import Validator from '~/util/validator';

export class Mail extends ValueObject<string> {
  static create(value: string): Mail {
    // validation
    Mail.validate(value);

    return new Mail(value);
  }

  static validate(value: string): void {
    if (!value) return;

    const validator = new Validator({ value: value, description: 'メール' });

    validator.string();
    validator.mailAddress();
  }

  static empty(): Mail {
    return new Mail(EMPTY_STRING);
  }

  copy(): Mail {
    return new Mail(this.value);
  }
}
