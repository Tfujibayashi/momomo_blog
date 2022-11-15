import { ValueObject } from '~/models/common-class';
import Validator from '~/util/validator';

export class Id extends ValueObject<number> {
  static validate(value: number, description: string): void {
    const validator = new Validator({ value, description });

    validator.number();
  }

  copy(): Id {
    return new Id(this.value);
  }
}
