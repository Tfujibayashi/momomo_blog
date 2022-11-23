import { shallowEqual } from 'shallow-equal-object';

import { EMPTY_NUMBER, EMPTY_STRING } from '~/constants';

abstract class BaseModel<T> {
  _value: T;

  protected constructor(_value: T) {
    this._value = _value;
  }

  get value(): T {
    return this._value;
  }

  set value(value: T) {
    this._value = value;
  }

  isEqual(vo?: BaseModel<T>): boolean {
    if (vo == null) {
      return false;
    }

    return shallowEqual(this._value, vo._value);
  }
}

export abstract class Entity<T extends {}> extends BaseModel<T> {
  get props(): T {
    return this._value;
  }

  abstract get isEmpty(): boolean;

  get isNotEmpty(): boolean {
    return !this.isEmpty;
  }

  abstract copy(): Entity<T>;

  assign(props: Partial<T>): typeof this {
    Object.assign(this._value, props);

    return this;
  }
}

export abstract class EntityList<T> extends BaseModel<Array<T>> {
  get isEmpty(): boolean {
    return this.value.length === 0;
  }

  get isNotEmpty(): boolean {
    return !this.isEmpty;
  }

  get length(): number {
    return this.value.length;
  }

  push(item: T): Array<T> {
    return [...this.value, item];
  }

  unshift(item: T): Array<T> {
    return [item, ...this.value];
  }

  /**
   * 任意のオブジェクトを削除
   */
  remove(item: T): Array<T> {
    return this.value.filter((_item) => !shallowEqual(item, _item));
  }

  includes(item: T): boolean {
    return this.value.some((_item: T) => shallowEqual(item, _item));
  }
}

export abstract class ValueObject<T extends string | number | Date | null> extends BaseModel<T> {
  get isEmpty(): boolean {
    if (typeof this.value === 'string') {
      return this.value === EMPTY_STRING;
    } else if (typeof this.value === 'number') {
      return this.value === EMPTY_NUMBER;
    } else if (this.value === 'null') {
      return this.value === null;
    } else {
      return this.value === undefined;
    }
  }

  get isNotEmpty(): boolean {
    return !this.isEmpty;
  }

  abstract copy(): ValueObject<T>;
}
