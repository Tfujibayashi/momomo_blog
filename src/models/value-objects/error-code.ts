import { EMPTY_NUMBER } from '~/constants';
import { ValueObject } from '~/models/common-class';

export class ErrorCode extends ValueObject<number> {
  static create(value: number): ErrorCode {
    // validation

    return new ErrorCode(value);
  }

  static empty(): ErrorCode {
    return new ErrorCode(EMPTY_NUMBER);
  }

  copy(): ErrorCode {
    return new ErrorCode(this.value);
  }
}
