import { FirebaseError } from 'firebase/app';
import {
  Auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from 'firebase/auth';

import { ERROR_CODE, UNDEFINED_ERROR } from './constants';
import { auth } from '~/firebase';
import { User } from '~/models';

class Authenticator {
  readonly auth: Auth;
  user!: FirebaseUser;

  constructor() {
    this.auth = auth;
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
