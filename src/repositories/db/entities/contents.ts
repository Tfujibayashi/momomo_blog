import { TimeStamp } from '~/types';

export type ContentEntity = {
  id?: string;
  title: string;
  text: string;
  imagePath: string;
  isPublic: boolean;
  createdAt: TimeStamp;
  updatedAt: TimeStamp;
  deletedAt: null | TimeStamp;
};
