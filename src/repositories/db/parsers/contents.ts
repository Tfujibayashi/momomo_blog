import { Content } from '~/models';
import { AddContentRequestBody, SaveContentRequestBody } from '~/repositories/db';

export class ContentsParser {
  parseSaveContentRequestBody(content: Content): SaveContentRequestBody {
    const { id, title, text, isPublic } = content.props;

    return {
      id: id.value,
      title: title.value,
      text: text.value,
      isPublic,
    };
  }

  parseAddContentRequestBody(content: Content): AddContentRequestBody {
    const { id, title, text, imagePath } = content.props;

    return {
      id: id.value,
      title: title.value,
      text: text.value,
      // imagePath: imagePath.value,
    };
  }
}
