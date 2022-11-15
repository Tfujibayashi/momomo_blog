import styles from '@styles/sign-in.module.scss';

import { AuthContextStore, useAuthContext, useSignIn } from '~/hooks';

export const SignInForm = (): JSX.Element => {
  const { isSignIng, signIn } = useAuthContext() as AuthContextStore;
  const { inputs, setInputs } = useSignIn();

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();

    void signIn(inputs.mail, inputs.password);
  };

  const handleChangeMail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs({ mail: event.target.value });
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs({ password: event.target.value });
  };

  return (
    <form className={styles['sign-in-form']} onSubmit={handleSubmit}>
      <input
        type="email"
        className={styles['sign-in-username']}
        autoFocus
        required
        placeholder="Email"
        onChange={handleChangeMail}
      />
      <input
        type="password"
        className={styles['sign-in-password']}
        required
        placeholder="Password"
        onChange={handleChangePassword}
      />
      <input type="submit" name="Login" value="Login" disabled={isSignIng} />

      {isSignIng && <p>now login...</p>}
    </form>
  );
};
