import { REGEX } from './constants';

interface Props {
  value: unknown;
  description: string;
}

/**
 * バリデーター
 */
export default class Validator {
  readonly value: unknown;
  readonly description: string;

  constructor(props: Props) {
    this.value = props.value;
    this.description = props.description;
  }

  /**
   * String型チェック
   */
  string(): void {
    if (typeof this.value !== 'string') {
      throw new Error(`${this.description}の型が不正です`);
    }
  }

  /**
   * Number型チェック
   */
  number(): void {
    if (typeof this.value !== 'number') {
      throw new Error(`${this.description}の型が不正です`);
    }
  }

  /**
   * 文字数の最大値チェック
   */
  maxLength(max: number): void {
    if ((this.value as string).length > max) {
      throw new Error(`${this.description}は、${max - 1}文字以下にしてください`);
    }
  }

  /**
   * 文字数の最小値チェック
   */
  minLength(min: number): void {
    if ((this.value as string).length < min) {
      throw new Error(`${this.description}は、${min - 1}文字以上にしてください`);
    }
  }

  /**
   * 最大値チェック
   */
  max(max: number): void {
    if ((this.value as number) > max) {
      throw new Error(`${this.description}は、${max - 1}以下にしてください`);
    }
  }

  /**
   * 最小値チェック
   */
  min(min: number): void {
    if ((this.value as number) < min) {
      throw new Error(`${this.description}は、${min - 1}以上にしてください`);
    }
  }

  /**
   * 自然数チェック
   */
  naturalNumber(): void {
    this.integer();
    this.min(1);
  }

  /**
   * パスワードチェック
   */
  password(): void {
    if (!this.value) return;

    if (!REGEX.password.test(this.value as string)) {
      throw new Error('パスワードは、大文字と数字を１つ以上含むようにしてください');
    }
  }

  /**
   * メールアドレス
   */
  mailAddress(): void {
    if (!REGEX.mailAddress.test(this.value as string)) {
      throw new Error('メールアドレスの形式をご確認してください');
    }
  }

  /**
   * 日付
   */
  date(): void {
    if (!REGEX.date.test(this.value as string)) {
      throw new Error('日付の形式が正しくありません');
    }
  }

  /**
   * 日時
   */
  dateTime(): void {
    if (!REGEX.dateTime.test(this.value as string)) {
      throw new Error('日時の形式が正しくありません');
    }
  }

  /**
   * 整数判定
   */
  private integer(): void {
    if (!Number.isInteger(this.value)) {
      throw new Error('整数ではありません');
    }
  }

  /**
   * 小数判定
   */
  private decimal(): void {
    if (Number.isInteger(this.value)) {
      throw new Error('小数ではありません');
    }
  }
}
