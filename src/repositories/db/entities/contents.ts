import { TimeStamp } from '~/types';

export type ContentEntity = {
  id?: string;
  title: string;
  text: string;
  imagePath?: string;
  createdAt: TimeStamp;
  updatedAt: TimeStamp;
  deletedAt: null | TimeStamp;
};
