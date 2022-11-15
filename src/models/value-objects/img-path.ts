import { EMPTY_STRING } from '~/constants';
import { ValueObject } from '~/models/common-class';

export class ImgPath extends ValueObject<string> {
  static create(value: string): ImgPath {
    // validation

    return new ImgPath(value);
  }

  static empty(): ImgPath {
    return new ImgPath(EMPTY_STRING);
  }

  copy(): ImgPath {
    return new ImgPath(this.value);
  }
}
