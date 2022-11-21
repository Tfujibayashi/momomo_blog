import { Firestore } from 'firebase/firestore';

import { ContentsDataBase } from './db/contents';
import { Content, ContentId, ContentList } from '~/models';
import { ContentsMapper } from '~/repositories/db';

export default class ContentsRepository {
  private mapper: ContentsMapper;

  private db;

  constructor(db: Firestore) {
    this.mapper = new ContentsMapper();

    this.db = new ContentsDataBase(db);
  }

  public getContentList = async (): Promise<ContentList> => {
    const contents = await this.db.getContents();

    return this.mapper.mapContentList(contents);
  };

  public getContent = async (contentId: ContentId): Promise<Content> => {
    const content = await this.db.getContent(contentId);

    return content ? this.mapper.mapContent(content) : Content.empty();
  };

  public saveContent = async (content: Content): Promise<void> => {
    if (content.props.id.isEmpty) {
      await this.db.addContent(content);
    } else {
      await this.db.saveContent(content);
    }
  };

  public deleteContent = async (contentId: ContentId): Promise<void> => {
    await this.db.deleteContent(contentId);
  };
}
