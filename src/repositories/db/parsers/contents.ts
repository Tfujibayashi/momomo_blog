import { Content } from '~/models';
import { AddContentRequestBody, SaveContentRequestBody } from '~/repositories/db';

export class ContentsParser {
  parseSaveContentRequestBody(content: Content): SaveContentRequestBody {
    const { title, text } = content.props;

    return {
      title: title.value,
      text: text.value,
    };
  }

  parseAddContentRequestBody(content: Content): AddContentRequestBody {
    const { title, text, imagePath } = content.props;

    return {
      title: title.value,
      text: text.value,
      // imagePath: imagePath.value,
    };
  }
}
