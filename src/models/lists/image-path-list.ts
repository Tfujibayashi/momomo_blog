import { EntityList } from '~/models/common-class';
import { ImagePath } from '~/models/value-objects/image-path';

export class ImagePathList extends EntityList<ImagePath> {
  get values(): string[] {
    return this.value.map((_value) => {
      return _value.value;
    });
  }

  static create(imagPaths: ImagePath[] = []): ImagePathList {
    return new ImagePathList(imagPaths);
  }

  static empty(): ImagePathList {
    return new ImagePathList([]);
  }

  copy(): ImagePathList {
    return new ImagePathList(this.value);
  }
}
