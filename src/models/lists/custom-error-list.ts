import { EntityList } from '~/models/common-class';
import { CustomError } from '~/models/entities/custom-error';

export class CustomErrorList extends EntityList<CustomError> {
  static create(customErrors: CustomError[] = []): CustomErrorList {
    return new CustomErrorList(customErrors);
  }

  static empty(): CustomErrorList {
    return new CustomErrorList([]);
  }

  copy(): CustomErrorList {
    return new CustomErrorList(this.value);
  }
}
