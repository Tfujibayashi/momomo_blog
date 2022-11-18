import {
  collection,
  doc,
  DocumentData,
  Firestore,
  FirestoreDataConverter,
  getDoc,
  getDocs,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

import { ContentEntity } from '~/repositories/db';

const COLLECTION_NAME = 'contents';

export class ContentsDataBase {
  private collectionName;
  private db;

  constructor(db: Firestore) {
    this.db = db;
    this.collectionName = COLLECTION_NAME;
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
    const collectionRef = collection(this.db, this.collectionName).withConverter(
      this.contentConverter,
    );

    const snapshot = await getDocs(collectionRef);

    return snapshot.docs.map((doc) => doc.data());
  };

  public getContent = async (id: string): Promise<ContentEntity | undefined> => {
    const docRef = doc(this.db, this.collectionName, id).withConverter(this.contentConverter);

    const snapshot = await getDoc(docRef);

    return snapshot.data();
  };
}
