import { Entity } from '~/models/common-class';
import { ApiError } from '~/models/entities/api-error';

interface PromiseStateProps<T> {
  result?: T;
  error: ApiError;
  pending: boolean;
}

export class PromiseState<T> extends Entity<PromiseStateProps<T>> {
  get isEmpty(): boolean {
    return !this.props.result;
  }

  get isSuccess(): boolean {
    return !!this.props.result;
  }

  get isError(): boolean {
    return this.props.error.isNotEmpty;
  }

  get result(): T | undefined {
    return this.props.result;
  }

  get errorMessage(): string {
    return this.props.error.props.message.value;
  }

  get pending(): boolean {
    return this.props.pending;
  }

  static create<T>(props: PromiseStateProps<T>): PromiseState<T> {
    return new PromiseState<T>(props);
  }

  static empty<T>(): PromiseState<T> {
    return new PromiseState<T>({
      result: undefined,
      error: ApiError.empty(),
      pending: true,
    });
  }

  copy(): PromiseState<T> {
    return new PromiseState<T>({
      result: this.props.result,
      error: this.props.error.copy(),
      pending: this.props.pending,
    });
  }
}
