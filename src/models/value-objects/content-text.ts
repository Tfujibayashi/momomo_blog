import { EMPTY_STRING } from '~/constants';
import { ValueObject } from '~/models/common-class';
import Validator from '~/util/validator';

export class ContentText extends ValueObject<string> {
  static create(value: string): ContentText {
    // validation
    ContentText.validate(value);

    return new ContentText(value);
  }

  static validate(value: string): void {
    const validator = new Validator({ value: value, description: '記事の本文' });

    validator.string();
  }

  static empty(): ContentText {
    return new ContentText(EMPTY_STRING);
  }

  copy(): ContentText {
    return new ContentText(this.value);
  }
}
