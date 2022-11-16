import { ScheduleClient, ScheduleMapper, ScheduleParser } from '~/api';
import { ItemId, ScheduleList, UserId } from '~/models';

export default class ScheduleRepository {
  apiClient: typeof ScheduleClient;
  parser: ScheduleParser;
  mapper: ScheduleMapper;

  constructor() {
    this.apiClient = ScheduleClient;
    this.parser = new ScheduleParser();
    this.mapper = new ScheduleMapper();
  }

  public getScheduleList = async (userId: UserId, itemId: ItemId): Promise<ScheduleList> => {
    const response = await this.apiClient.call(
      'GET',
      `/users/${userId.value}/items/${itemId.value}/schedules`,
      undefined,
      'スケジュールの取得',
    );

    const scheduleList = this.mapper.scheduleListMapper(response);

    return scheduleList;
  };

  public postSchedule = async (
    scheduleList: ScheduleList,
    userId: UserId,
    itemId: ItemId,
  ): Promise<void> => {
    const body = this.parser.postScheduleBodyParser(scheduleList);

    await this.apiClient.call(
      'POST',
      `/users/${userId.value}/items/${itemId.value}/schedules`,
      body,
      'スケジュールの更新',
    );
  };
}
