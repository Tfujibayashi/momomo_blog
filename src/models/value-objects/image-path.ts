import { NO_IMAGE_PATH } from '~/constants';
import { ValueObject } from '~/models/common-class';

export class ImagePath extends ValueObject<string> {
  static create(value: string): ImagePath {
    if (!value) return ImagePath.empty();

    // validation

    return new ImagePath(value);
  }

  static empty(): ImagePath {
    return new ImagePath(NO_IMAGE_PATH);
  }

  copy(): ImagePath {
    return new ImagePath(this.value);
  }
}
