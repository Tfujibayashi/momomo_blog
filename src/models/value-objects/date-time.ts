import { Timestamp } from 'firebase/firestore';

import { ValueObject } from '~/models/common-class';
import { TimeStamp } from '~/types';
import Validator from '~/util/validator';

export class DateTime extends ValueObject<Date> {
  get timeStamp(): TimeStamp {
    return Timestamp.fromDate(this.value);
  }

  static create(value: Date): DateTime {
    // validation
    DateTime.validate(value);

    return new DateTime(value);
  }

  static validate(value: Date): void {
    const validator = new Validator({ value, description: '日時' });

    validator.dateObject();
  }

  static empty(): DateTime {
    return new DateTime(new Date());
  }

  copy(): DateTime {
    return new DateTime(this.value);
  }
}
