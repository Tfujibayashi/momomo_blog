import { EMPTY_STRING } from '~/constants';
import { ValueObject } from '~/models/common-class';
import Validator from '~/util/validator';

export class ContentTitle extends ValueObject<string> {
  static create(value: string): ContentTitle {
    // validation
    ContentTitle.validate(value);

    return new ContentTitle(value);
  }

  static validate(value: string): void {
    const validator = new Validator({ value: value, description: '記事のタイトル' });

    validator.string();
  }

  static empty(): ContentTitle {
    return new ContentTitle(EMPTY_STRING);
  }

  copy(): ContentTitle {
    return new ContentTitle(this.value);
  }
}
