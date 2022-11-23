import { Firestore } from 'firebase/firestore';

import { ContentsDataBase } from './db/contents';
import { Content, ContentId, ContentList } from '~/models';
import { ContentEntity, ContentsMapper, GetContentsQuery } from '~/repositories/db';

export default class ContentsRepository {
  private mapper: ContentsMapper;

  private db;

  constructor(db: Firestore) {
    this.mapper = new ContentsMapper();

    this.db = new ContentsDataBase(db);
  }

  public getContentList = async (
    query: GetContentsQuery = { isActive: true },
  ): Promise<ContentList> => {
    const contents = await this.db.getContents(query);

    return this.mapper.mapContentList(contents);
  };

  public getContent = async (contentId: ContentId): Promise<Content> => {
    const content = await this.db.getContent(contentId);

    return this.mapper.mapContent(content as ContentEntity);
  };

  public addContent = async (): Promise<ContentId> => {
    const contentId = await this.db.addContent(Content.empty());

    return ContentId.create(contentId);
  };

  public saveContent = async (content: Content): Promise<void> => {
    await this.db.saveContent(content);
  };

  public deleteContent = async (contentId: ContentId): Promise<void> => {
    await this.db.deleteContent(contentId);
  };

  public unDeleteContent = async (contentId: ContentId): Promise<void> => {
    await this.db.unDeleteContent(contentId);
  };
}
