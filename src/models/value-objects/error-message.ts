import { EMPTY_STRING } from '~/constants';
import { ValueObject } from '~/models/common-class';
import Validator from '~/util/validator';

export class ErrorMessage extends ValueObject<string> {
  static create(value: string): ErrorMessage {
    // validation
    ErrorMessage.validate(value);

    return new ErrorMessage(value);
  }

  static validate(value: string): void {
    const validator = new Validator({ value: value, description: 'エラーメッセージ' });

    validator.string();
  }

  static empty(): ErrorMessage {
    return new ErrorMessage(EMPTY_STRING);
  }

  copy(): ErrorMessage {
    return new ErrorMessage(this.value);
  }
}
