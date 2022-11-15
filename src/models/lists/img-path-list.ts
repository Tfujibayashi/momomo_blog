import { EntityList } from '~/models/common-class';
import { ImgPath } from '~/models/value-objects/img-path';

export class ImgPathList extends EntityList<ImgPath> {
  get values(): string[] {
    return this.value.map((_value) => {
      return _value.value;
    });
  }

  static create(imagPaths: ImgPath[] = []): ImgPathList {
    return new ImgPathList(imagPaths);
  }

  static empty(): ImgPathList {
    return new ImgPathList([]);
  }

  copy(): ImgPathList {
    return new ImgPathList(this.value);
  }
}
