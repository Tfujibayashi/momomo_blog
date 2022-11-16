import { EMPTY_STRING } from '~/constants';
import { ValueObject } from '~/models/common-class';
import { DateTimeType } from '~/types';
import Validator from '~/util/validator';

export class DateTime extends ValueObject<DateTimeType> {
  static create(value: string): DateTime {
    // validation
    DateTime.validate(value);

    return new DateTime(value as DateTimeType);
  }

  static validate(value: string): void {
    const validator = new Validator({ value, description: '日時' });

    validator.string();
    validator.dateTime();
  }

  static empty(): DateTime {
    return new DateTime(EMPTY_STRING as DateTimeType);
  }

  copy(): DateTime {
    return new DateTime(this.value);
  }
}
