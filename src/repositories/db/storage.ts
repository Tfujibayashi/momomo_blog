import { FirebaseStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const FOLDER_NAME = 'thumbnail';

export class Storage {
  private storage;

  constructor(storage: FirebaseStorage) {
    this.storage = storage;
  }

  public uploadFile = async (id: string, file: File): Promise<string> => {
    const storageRef = ref(this.storage, `${FOLDER_NAME}/${id}/thumbnail.jpg`);
    await uploadBytes(storageRef, file);

    return await getDownloadURL(storageRef);
  };
}
