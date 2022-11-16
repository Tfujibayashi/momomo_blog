import { EMPTY_STRING } from '~/constants';
import { ValueObject } from '~/models/common-class';

export class ImagePath extends ValueObject<string> {
  static create(value: string): ImagePath {
    // validation

    return new ImagePath(value);
  }

  static empty(): ImagePath {
    return new ImagePath(EMPTY_STRING);
  }

  copy(): ImagePath {
    return new ImagePath(this.value);
  }
}
