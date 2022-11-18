import {
  collection,
  DocumentData,
  FirestoreDataConverter,
  getDocs,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

import { db } from '~/firebase';
import { ContentEntity, ContentsMapper, ContentsParser } from '~/repositories/db';

export class ContentsDataBase {
  private parser: ContentsParser;
  private mapper: ContentsMapper;

  constructor() {
    this.parser = new ContentsParser();
    this.mapper = new ContentsMapper();
  }

  private toFirestore = (entity: ContentEntity): DocumentData => {
    return {
      ...entity,
    };
  };

  private fromFirestore = (
    snapshot: QueryDocumentSnapshot<ContentEntity>,
    options: SnapshotOptions,
  ): ContentEntity => {
    const data = snapshot.data(options);

    return {
      ...data,
      id: snapshot.id,
    };
  };

  private contentConverter: FirestoreDataConverter<ContentEntity> = {
    toFirestore: this.toFirestore,
    fromFirestore: this.fromFirestore,
  };

  public getContents = async (): Promise<ContentEntity[]> => {
    const contentsCollection = collection(db, 'contents').withConverter(this.contentConverter);
    const snapshot = await getDocs(contentsCollection);

    return snapshot.docs.map((doc) => doc.data());
  };
}
