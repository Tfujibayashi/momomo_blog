import {
  collection,
  DocumentData,
  FirestoreDataConverter,
  getDocs,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

import { ContentEntity, ContentsMapper, ContentsParser } from '~/api';
import { db } from '~/firebase';
import { Content, ContentList } from '~/models';

export default class ContentsRepository {
  // apiClient: typeof ScheduleClient;
  private parser: ContentsParser;
  private mapper: ContentsMapper;

  constructor() {
    // this.apiClient = ScheduleClient;
    this.parser = new ContentsParser();
    this.mapper = new ContentsMapper();
  }

  toFirestore = (content: Content): DocumentData => {
    return this.parser.parseContent(content);
  };

  fromFirestore = (
    snapshot: QueryDocumentSnapshot<ContentEntity>,
    options: SnapshotOptions,
  ): Content => {
    const data = snapshot.data(options);

    return this.mapper.mapContent(data);
  };

  public contentConverter: FirestoreDataConverter<Content> = {
    toFirestore: this.toFirestore,
    fromFirestore: this.fromFirestore,
  };

  public getContents = async (): Promise<ContentList> => {
    const contentsCollection = collection(db, 'contents').withConverter(this.contentConverter);
    const snapshot = await getDocs(contentsCollection);

    const hoge = snapshot.docs.map((doc) => doc.data());

    return ContentList.create(hoge);
  };
}
