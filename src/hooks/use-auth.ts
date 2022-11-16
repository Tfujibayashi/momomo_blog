import { createContext, useContext, useEffect } from 'react';

import { User as FirebaseUser } from 'firebase/auth';

import { useRoute, useState, useToast } from '~/hooks';
import { Mail, Password, User } from '~/models';
import authenticator from '~/util/authenticator';

export const useAuth = () => {
  /**
   * Hooks
   */
  const { showErrorToast, showSuccessToast } = useToast();
  const { push } = useRoute();

  /**
   * State
   */
  const [state, setState] = useState({
    user: null as unknown as FirebaseUser,
    loading: true,
    isSignIng: false,
    isSignOuting: false,
  });

  /**
   * Methods
   */
  const _makeSignInUserModel = (mail: string, password: string): User => {
    const user = User.empty().assign({
      mail: Mail.create(mail),
      password: Password.create(password),
    });

    return user;
  };

  const signIn = async (mail: string, password: string) => {
    setState({ isSignIng: true });

    try {
      const user = _makeSignInUserModel(mail, password);

      await authenticator.signIn(user);

      showSuccessToast('ログインしました');

      push('/edit');
    } catch (e) {
      showErrorToast((e as Error).message);
    }

    setState({ isSignIng: false });
  };

  const signOut = async () => {
    setState({ isSignOuting: true });

    try {
      await authenticator.signOut();

      showSuccessToast('ログアウトしました');
    } catch {
      showErrorToast('ログアウトに失敗しました');
    }

    setState({ isSignOuting: false });
  };

  // https://reffect.co.jp/react/react-native-firebase#i-3
  useEffect(() => {
    setState({ loading: true });

    const unsubscribe = authenticator.onAuthStateChanged(authenticator.auth, (user) => {
      if (user) {
        authenticator.setUser(user);
        setState({ user });
      } else {
        setState({ user: null as unknown as FirebaseUser });
      }

      setState({ loading: false });
    });

    return () => unsubscribe();
  }, []);

  return { ...state, signIn, signOut };
};

export type AuthContextStore = ReturnType<typeof useAuth>;
export const AuthContext = createContext<AuthContextStore | null>(null);
export const useAuthContext = (): AuthContextStore | null => useContext(AuthContext);
