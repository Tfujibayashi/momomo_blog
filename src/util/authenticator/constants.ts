// https://firebase.google.com/docs/auth/admin/errors?hl=ja
export const ERROR_CODE: { [key: string]: string } = {
  'auth/email-already-exists': '既に使用されているメールアドレスです',
  'auth/invalid-email': 'メールアドレスの形式をご確認してください',
  'auth/user-not-found': 'メールアドレスまたはパスワードが違います',
  'auth/weak-password': 'パスワードは6文字以上にしてください',
  'auth/wrong-password': 'メールアドレスまたはパスワードが違います',
  'auth/user-disabled': 'アカウントがバンされています。お手数ですが運営にお問合せください',
};

export const UNDEFINED_ERROR = '予期せぬエラーが発生しました。お手数ですが運営にお問合せください';
