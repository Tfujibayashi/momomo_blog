import { Firestore } from 'firebase/firestore';

import { ContentsDataBase } from './db/contents';
import { Content, ContentId, ContentList } from '~/models';
import { ContentsMapper, ContentsParser } from '~/repositories/db';

export default class ContentsRepository {
  private parser: ContentsParser;
  private mapper: ContentsMapper;

  private db;

  constructor(db: Firestore) {
    this.parser = new ContentsParser();
    this.mapper = new ContentsMapper();

    this.db = new ContentsDataBase(db);
  }

  public getContentList = async (): Promise<ContentList> => {
    const contents = await this.db.getContents();

    return this.mapper.mapContentList(contents);
  };

  public getContent = async (contentId: ContentId): Promise<Content> => {
    const content = await this.db.getContent(contentId.value);

    return content ? this.mapper.mapContent(content) : Content.empty();
  };
}
