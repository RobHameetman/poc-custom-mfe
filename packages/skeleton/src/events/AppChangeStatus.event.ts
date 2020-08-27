import { Events, Statuses } from '../../enums';

export type AppChangeStatusEventDetail = [
  string,
  Statuses,
];

export default class AppChangeStatusEvent extends CustomEvent<AppChangeStatusEventDetail> {
  public static readonly type = `skeleton:${Events.APP_CHANGE_STATUS}`;

  constructor(appName: string, status: Statuses) {
    super(AppChangeStatusEvent.type, {
      detail: [ appName, status ]
    });
  }
}
