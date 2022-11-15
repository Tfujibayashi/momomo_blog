import { EMPTY_NUMBER } from '~/constants';
import { ValueObject } from '~/models/common-class';

export class Limit extends ValueObject<number> {
  static create(value: number): Limit {
    // validation

    return new Limit(value);
  }

  static empty(): Limit {
    return new Limit(EMPTY_NUMBER);
  }

  copy(): Limit {
    return new Limit(this.value);
  }
}
