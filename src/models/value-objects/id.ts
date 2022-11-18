import { ValueObject } from '~/models/common-class';
import Validator from '~/util/validator';

export class Id extends ValueObject<string> {
  static validate(value: string, description: string): void {
    const validator = new Validator({ value, description });

    validator.string();
  }

  copy(): Id {
    return new Id(this.value);
  }
}
