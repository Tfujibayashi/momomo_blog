import { EMPTY_STRING } from '~/constants';
import { ValueObject } from '~/models/common-class';
import Validator from '~/util/validator';

export class Url extends ValueObject<string> {
  static create(value: string): Url {
    // validation
    Url.validate(value);

    return new Url(value);
  }

  static validate(value: string): void {
    const validator = new Validator({ value: value, description: 'URL' });

    validator.string();
  }

  static empty(): Url {
    return new Url(EMPTY_STRING);
  }

  copy(): Url {
    return new Url(this.value);
  }
}
