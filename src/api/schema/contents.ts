import { GetContentsResponse } from '~/api';

export interface ContentsSchema {
  resource: {
    contents: {
      GET: {
        response: GetContentsResponse;
      };
    };
  };
}
