import { EMPTY_STRING } from '~/constants';
import { ValueObject } from '~/models/common-class';
import { DateType } from '~/types';
import Dater from '~/util/dater';
import Validator from '~/util/validator';

export class Date extends ValueObject<DateType> {
  get year(): number {
    return Number(this.value.split('-')[0]);
  }

  get month(): number {
    return Number(this.value.split('-')[1]);
  }

  get day(): number {
    return Number(this.value.split('-')[2]);
  }

  static create(value: string): Date {
    // validation
    Date.validate(value);

    return new Date(value as DateType);
  }

  static validate(value: string): void {
    const validator = new Validator({ value, description: '日付' });

    validator.string();
    validator.date();
  }

  static empty(): Date {
    return new Date(EMPTY_STRING as DateType);
  }

  static format(year: number, month: number, day: number): DateType {
    return `${String(year).padStart(2, '0')}-${String(month).padStart(2, '0')}-${String(
      day,
    ).padStart(2, '0')}` as DateType;
  }

  static split(date: Date): { year: number; month: number; day: number } {
    return {
      year: date.year,
      month: date.month,
      day: date.day,
    };
  }

  copy(): Date {
    return new Date(this.value);
  }

  toDater(): Dater {
    return new Dater(this.value);
  }
}
