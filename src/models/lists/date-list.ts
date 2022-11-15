import { EntityList } from '~/models/common-class';
import { Date } from '~/models/value-objects/date';
import { DateType } from '~/types';

export class DateList extends EntityList<Date> {
  get values(): DateType[] {
    return this.value.map((date) => {
      return date.value;
    });
  }

  get startDate(): Date {
    return this.value[0] ? this.value[0] : Date.empty();
  }

  get endDate(): Date {
    return this.value[this.length - 1] ? this.value[this.length - 1] : Date.empty();
  }

  get periods(): [Date, Date] {
    return [this.startDate, this.endDate];
  }

  static create(dates: Date[] = []): DateList {
    return new DateList(dates);
  }

  static empty(): DateList {
    return new DateList([]);
  }

  static convertList(startDate: Date, endDate: Date): DateList {
    const diffDay = endDate.toDater().diffDay(startDate.toDater());

    const dates = [...Array(diffDay + 1).keys()].map((_, i) => {
      const date = startDate.toDater().addDay(i).format('YYYY-MM-DD');

      return Date.create(date);
    });

    return new DateList(dates);
  }

  copy(): DateList {
    return new DateList(this.value);
  }

  /**
   * 既に存在する場合は削除、ない場合は追加
   */
  update(date: Date): DateList {
    if (this.includes(date)) {
      return new DateList(this.remove(date));
    } else {
      return new DateList(this.push(date));
    }
  }

  /**
   * 指定する期間の日程を削除
   */
  exclude(start: Date, end: Date): DateList {
    const dateList = this.value.filter((item) => {
      return !(
        item.toDater().isBefore(end.toDater(), true) &&
        item.toDater().isAfter(start.toDater(), true)
      );
    });

    return new DateList(dateList);
  }
}
