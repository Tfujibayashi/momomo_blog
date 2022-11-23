import {
  addDoc,
  collection,
  doc,
  DocumentData,
  Firestore,
  FirestoreDataConverter,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  SnapshotOptions,
  updateDoc,
  where,
} from 'firebase/firestore';

import { Content, ContentId } from '~/models';
import { ContentEntity, ContentsParser, GetContentsQuery } from '~/repositories/db';

const COLLECTION_NAME = 'contents';

export class ContentsDataBase {
  private collectionName;
  private db;
  private parser: ContentsParser;

  constructor(db: Firestore) {
    this.db = db;
    this.collectionName = COLLECTION_NAME;
    this.parser = new ContentsParser();
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

  public getContents = async (_query: GetContentsQuery): Promise<ContentEntity[]> => {
    const collectionRef = collection(this.db, this.collectionName).withConverter(
      this.contentConverter,
    );

    let q = query(collectionRef);

    if (_query.isActive) {
      q = query(collectionRef, where('deletedAt', '==', null));
    }

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => doc.data());
  };

  public getContent = async (contentId: ContentId): Promise<ContentEntity | undefined> => {
    const docRef = doc(this.db, this.collectionName, contentId.value).withConverter(
      this.contentConverter,
    );

    const snapshot = await getDoc(docRef);

    return snapshot.data();
  };

  public saveContent = async (content: Content): Promise<void> => {
    const docRef = doc(this.db, this.collectionName, content.props.id.value).withConverter(
      this.contentConverter,
    );

    const request = this.parser.parseSaveContentRequestBody(content);

    await updateDoc(docRef, {
      ...request,
      updatedAt: serverTimestamp(),
    });
  };

  public addContent = async (content: Content): Promise<string> => {
    const collectionRef = collection(this.db, this.collectionName).withConverter(
      this.contentConverter,
    );

    const request = this.parser.parseAddContentRequestBody(content);

    return (
      await addDoc(collectionRef, {
        ...request,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        deletedAt: null,
      })
    ).id;
  };

  public deleteContent = async (contentId: ContentId): Promise<void> => {
    const docRef = doc(this.db, this.collectionName, contentId.value).withConverter(
      this.contentConverter,
    );

    await updateDoc(docRef, {
      deletedAt: serverTimestamp(),
    });
  };

  public unDeleteContent = async (contentId: ContentId): Promise<void> => {
    const docRef = doc(this.db, this.collectionName, contentId.value).withConverter(
      this.contentConverter,
    );

    await updateDoc(docRef, {
      deletedAt: null,
    });
  };
}
