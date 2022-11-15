import { FirebaseError, FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';
import {
  Auth,
  getAuth,
  initializeAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from 'firebase/auth';

import { ERROR_CODE, UNDEFINED_ERROR } from './constants';
import { User } from '~/models';

class Authenticator {
  protected config: FirebaseOptions;
  readonly auth: Auth;
  user!: FirebaseUser;

  constructor() {
    this.config = {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID,
      measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    } as FirebaseOptions;

    if (!getApps().length) {
      const app = initializeApp(this.config);

      this.auth = initializeAuth(app);
    } else {
      const app = getApp();
      this.auth = getAuth(app);
    }
  }

  onAuthStateChanged = onAuthStateChanged;

  signIn = async (user: User): Promise<void> => {
    const { mail, password } = user.props;

    try {
      await signInWithEmailAndPassword(this.auth, mail.value, password.value);
    } catch (e) {
      this.handelFirebaseError(e as FirebaseError);
    }
  };

  signOut = async (): Promise<void> => {
    try {
      await signOut(this.auth);
    } catch (e) {
      this.handelFirebaseError(e as FirebaseError);
    }
  };

  setUser(user: FirebaseUser): void {
    this.user = user;
  }

  private translateErrorCodeToMessage = (code: string): string => {
    return ERROR_CODE[code] ?? UNDEFINED_ERROR;
  };

  private handelFirebaseError = (error: FirebaseError): void => {
    throw new Error(this.translateErrorCodeToMessage(error.code));
  };
}

export default new Authenticator();
