import { ContentsDataBase } from './db/contents';
import { ContentList } from '~/models';
import { ContentsMapper, ContentsParser } from '~/repositories/db';

export default class ContentsRepository {
  private parser: ContentsParser;
  private mapper: ContentsMapper;

  private db;

  constructor() {
    this.parser = new ContentsParser();
    this.mapper = new ContentsMapper();

    this.db = new ContentsDataBase();
  }

  public getContentList = async (): Promise<ContentList> => {
    const contents = await this.db.getContents();

    return this.mapper.mapContentList(contents);
  };
}
