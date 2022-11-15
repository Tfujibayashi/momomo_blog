import { EMPTY_NUMBER } from '~/constants';
import { ValueObject } from '~/models/common-class';

export class Offset extends ValueObject<number> {
  static create(value: number): Offset {
    // validation

    return new Offset(value);
  }

  static empty(): Offset {
    return new Offset(EMPTY_NUMBER);
  }

  copy(): Offset {
    return new Offset(this.value);
  }

  add(number: number): Offset {
    return new Offset(this.value + number);
  }
}
