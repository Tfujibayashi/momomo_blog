import {
  addDoc,
  collection,
  CollectionReference,
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

import { ContentId } from '~/models';
import { ContentEntity, GetContentsQuery, SaveContentRequestBody } from '~/repositories/db';

const COLLECTION_NAME = 'contents';

export class ContentsDataBase {
  private collectionName;
  private db: Firestore;
  private collectionRef: CollectionReference<ContentEntity>;

  constructor(db: Firestore) {
    this.db = db;
    this.collectionName = COLLECTION_NAME;

    this.collectionRef = collection(this.db, this.collectionName).withConverter(
      this.contentConverter,
    );
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
    let q = query(this.collectionRef);

    if (_query.onlyActive) {
      q = query(this.collectionRef, where('deletedAt', '==', null));
    }

    if (_query.onlyPublic) {
      q = query(this.collectionRef, where('isPublic', '==', true));
    }

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => doc.data());
  };

  public getContent = async (contentId: ContentId): Promise<ContentEntity | undefined> => {
    const docRef = doc(this.collectionRef, contentId.value).withConverter(this.contentConverter);

    const snapshot = await getDoc(docRef);

    return snapshot.data();
  };

  public addContent = async (): Promise<string> => {
    const collectionRef = collection(this.db, this.collectionName).withConverter(
      this.contentConverter,
    );

    return (
      await addDoc(collectionRef, {
        title: '',
        text: '',
        imagePath: '',
        isPublic: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        deletedAt: null,
      })
    ).id;
  };

  public saveContent = async (request: SaveContentRequestBody): Promise<void> => {
    const docRef = doc(this.collectionRef, request.id).withConverter(this.contentConverter);

    await updateDoc(docRef, {
      ...request,
      updatedAt: serverTimestamp(),
    });
  };

  public publishContent = async (contentId: string): Promise<void> => {
    const docRef = doc(this.collectionRef, contentId).withConverter(this.contentConverter);

    await updateDoc(docRef, {
      isPublic: true,
    });
  };

  public unPublishContent = async (contentId: string): Promise<void> => {
    const docRef = doc(this.collectionRef, contentId).withConverter(this.contentConverter);

    await updateDoc(docRef, {
      isPublic: false,
    });
  };

  public deleteContent = async (contentId: string): Promise<void> => {
    const docRef = doc(this.collectionRef, contentId).withConverter(this.contentConverter);

    await updateDoc(docRef, {
      deletedAt: serverTimestamp(),
    });
  };

  public unDeleteContent = async (contentId: string): Promise<void> => {
    const docRef = doc(this.collectionRef, contentId).withConverter(this.contentConverter);

    await updateDoc(docRef, {
      deletedAt: null,
    });
  };
}
