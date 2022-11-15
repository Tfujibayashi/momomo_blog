export const NOT_FOUND_ERROR = 'NOT FOUND ERROR';
export const PARSE_ERROR = 'PARSE ERROR';
export const NETWORK_ERROR = 'NETWORK ERROR';
export const UNKNOWN_ERROR = 'UNKNOWN ERROR';

export const API_ERROR: {
  [key: number]: string;
} = {
  400000: 'XXが正しいかご確認ください',
  400001: '',
  400002: '画像サイズが大きすぎます',
  400003: 'XXが正しい入力かご確認ください',
  400100: 'XXは既に登録済みです',
  400200: '他の方の商品は操作できません',
  400201: '他の方の取引は操作できません',
  400300: 'XXは既に削除済みです',
  400400: '再度ログインしてお試しください',
  400500: '他のユーザーが編集中です',
  400501: '日付が正しいかご確認ください',
  400600: '発送日時と到着日時は更新できません',
  500000: 'サーバーエラーです',
  500100: 'サーバーエラーです', // MEMO: DBのエラーだがフロントではサーバーエラーとして同一のものとして扱う
  500200: 'firebase エラー', // TODO: 詳細のエラーを記載する
  500300: 'stripeのエラーです', // MEMO: 現状、特にいらない気がする
  500400: 'サーバーエラーです', // MEMO: これもいらない（ユーザーからは関係ない）
};

export const API_ERROR_TARGET: {
  [key: string]: string;
} = {
  UserName: 'ユーザー名',
  MailAddress: 'メールアドレス',
  Password: 'パスワード',
};
