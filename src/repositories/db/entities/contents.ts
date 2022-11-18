import { TimeStamp } from '~/types';

export type ContentEntity = {
  title: string;
  text: string;
  imagePath: string;
  createdAt: TimeStamp;
  updatedAt: TimeStamp;
  deletedAt: TimeStamp;
};
