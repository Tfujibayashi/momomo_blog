import dayjs, { ConfigType, Dayjs, ManipulateType, OpUnitType } from 'dayjs';

import 'dayjs/locale/ja';
import { DateType } from '~/types';

// https://day.js.org/en/
export default class Dater {
  private _dayjs: Dayjs;

  /**
   * 今日かどうか
   */
  get isToday(): boolean {
    return this.isSameDate(new Dater());
  }

  /**
   * 明日かどうか
   */
  get isTomorrow(): boolean {
    return this.isSameDate(new Dater().addDay(1));
  }

  constructor(date?: ConfigType, locale = 'ja') {
    this._dayjs = dayjs(date).locale(locale);
  }

  static toDateType(value: ConfigType): DateType {
    return dayjs(value).format('YYYY-MM-DD') as DateType;
  }

  format(format = 'YYYY/MM/DD (ddd)'): DateType {
    return this._dayjs.format(format) as DateType;
  }

  /**
   * 今年であれば年を表示しないフォーマット
   */
  thisYearFormat(): string {
    const format = this.isThisYear() ? 'M月D日 (ddd)' : 'YYYY年M月D日 (ddd)';

    return this.format(format);
  }

  addDay(value: number): Dater {
    return this._add(value, 'day');
  }

  addMonth(value: number): Dater {
    return this._add(value, 'month');
  }

  diffDay(target: Dater): number {
    const targetDate = target.format();

    return this._diff(targetDate, 'day');
  }

  /**
   * 年月日を取得する
   */
  fullDate(): string {
    return this.format('YYYY-MM-DD');
  }

  /**
   * 年を取得する
   */
  year(): number {
    return this._dayjs.year();
  }

  /**
   * 月を取得する
   */
  month(): number {
    return this._dayjs.month() + 1;
  }

  /**
   * 月初を取得する
   */
  startOfMonth(): Dater {
    return this.startOf('month');
  }

  /**
   * 月末を取得する
   */
  endOfMonth(): Dater {
    return this.endOf('month');
  }

  /**
   * 同一時刻か判断する
   */
  isSame(target: Dater): boolean {
    return this._dayjs.isSame(target.format());
  }

  /**
   * 対象時刻より前か判断する
   */
  isBefore(target: Dater, includeTarget = false): boolean {
    if (includeTarget && this.isSame(target)) {
      return true;
    }

    return this._dayjs.isBefore(target.format());
  }

  /**
   * 対象時刻より後か判断する
   */
  isAfter(target: Dater, includeTarget = false): boolean {
    if (includeTarget && this.isSame(target)) {
      return true;
    }

    return this._dayjs.isAfter(target.format());
  }

  /**
   * 今年か判断する
   */
  isThisYear(): boolean {
    return dayjs().year() === this.year();
  }

  /**
   * 同一日か判断する
   */
  isSameDate(target: Dater): boolean {
    return target.format('YYYY-MM-DD') === this.format('YYYY-MM-DD');
  }

  /**
   * 月・週などの開始日を取得する
   */
  private startOf(unit: OpUnitType): Dater {
    const target = this._dayjs.startOf(unit);

    return new Dater(target);
  }

  /**
   * 月・週などの終了日を取得する
   */
  private endOf(unit: OpUnitType): Dater {
    const target = this._dayjs.endOf(unit);

    return new Dater(target);
  }

  /**
   * 年・月・日の単位で加算する
   */
  private _add(value: number, unit?: ManipulateType): Dater {
    const addDate = this._dayjs.add(value, unit);

    return new Dater(addDate);
  }

  /**
   * 年・月・日の単位で差分を取得する
   */
  private _diff(date: string, unit?: OpUnitType): number {
    return this._dayjs.diff(date, unit);
  }
}
