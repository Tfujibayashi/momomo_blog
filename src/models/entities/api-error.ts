import { Entity } from '~/models/common-class';
import { ErrorCode, ErrorMessage } from '~/models/value-objects';

interface ApiErrorProps {
  e: Error;
  code: ErrorCode;
  message: ErrorMessage;
}

export class ApiError extends Entity<ApiErrorProps> {
  get isEmpty(): boolean {
    return this.props.message.isEmpty;
  }

  get message(): string {
    return this.props.message.value;
  }

  static create(props: ApiErrorProps): ApiError {
    return new ApiError(props);
  }

  static empty(): ApiError {
    return new ApiError({
      e: new Error(),
      code: ErrorCode.empty(),
      message: ErrorMessage.empty(),
    });
  }

  copy(): ApiError {
    return new ApiError({
      e: this.props.e,
      code: this.props.code.copy(),
      message: this.props.message.copy(),
    });
  }
}
