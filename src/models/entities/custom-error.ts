import { Entity } from '~/models/common-class';
import { ErrorCode, ErrorMessage } from '~/models/value-objects';

interface CustomErrorProps {
  e: Error;
  code: ErrorCode;
  message: ErrorMessage;
}

export class CustomError extends Entity<CustomErrorProps> {
  get isEmpty(): boolean {
    return this.props.message.isEmpty;
  }

  static create(props: CustomErrorProps): CustomError {
    return new CustomError(props);
  }

  static empty(): CustomError {
    return new CustomError({
      e: new Error(),
      code: ErrorCode.empty(),
      message: ErrorMessage.empty(),
    });
  }

  copy(): CustomError {
    return new CustomError({
      e: this.props.e,
      code: this.props.code.copy(),
      message: this.props.message.copy(),
    });
  }
}
