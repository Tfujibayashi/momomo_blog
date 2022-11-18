import { GetContentsResponse } from '~/repositories/db';

export interface ContentsSchema {
  resource: {
    contents: {
      GET: {
        response: GetContentsResponse;
      };
    };
  };
}
