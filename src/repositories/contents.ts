import { Firestore } from 'firebase/firestore';
import { FirebaseStorage } from 'firebase/storage';

import { ContentsDataBase } from './db/contents';
import { Storage } from './db/storage';
import { Content, ContentId, ContentList } from '~/models';
import { ContentEntity, ContentsMapper, ContentsParser, GetContentsQuery } from '~/repositories/db';

export default class ContentsRepository {
  private mapper: ContentsMapper;
  private parser: ContentsParser;

  private db;
  private storage;

  constructor(props: { db: Firestore; storage: FirebaseStorage }) {
    this.mapper = new ContentsMapper();
    this.parser = new ContentsParser();

    this.db = new ContentsDataBase(props.db);
    this.storage = new Storage(props.storage);
  }

  public getContentList = async (
    query: GetContentsQuery = { onlyActive: true, onlyPublic: true },
  ): Promise<ContentList> => {
    const contents = await this.db.getContents(query);

    return this.mapper.mapContentList(contents);
  };

  public getContent = async (contentId: ContentId): Promise<Content> => {
    const content = await this.db.getContent(contentId);

    return this.mapper.mapContent(content as ContentEntity);
  };

  public addContent = async (): Promise<ContentId> => {
    const contentId = await this.db.addContent();

    return ContentId.create(contentId);
  };

  public saveContent = async (content: Content): Promise<void> => {
    const request = this.parser.parseSaveContentRequestBody(content);

    await this.db.saveContent(request);
  };

  public publishContent = async (contentId: ContentId): Promise<void> => {
    await this.db.publishContent(contentId.value);
  };

  public unPublishContent = async (contentId: ContentId): Promise<void> => {
    await this.db.unPublishContent(contentId.value);
  };

  public deleteContent = async (contentId: ContentId): Promise<void> => {
    await this.db.deleteContent(contentId.value);
  };

  public unDeleteContent = async (contentId: ContentId): Promise<void> => {
    await this.db.unDeleteContent(contentId.value);
  };

  public uploadThumbnail = async (contentId: ContentId, file: File): Promise<void> => {
    const imagePath = await this.storage.uploadFile(contentId._value, file);

    await this.db.uploadThumbnail(contentId.value, imagePath);
  };
}
