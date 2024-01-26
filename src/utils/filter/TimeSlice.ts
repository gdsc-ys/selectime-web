import { User } from "../../interfaces/User";


export class TimeSlice {
  static UNIT_TIME = 900;

  beginTime: number;
  endTime: number;
  features: boolean[];
  users: Set<User>;

  constructor(
    beginTime: number,
    endTime: number,
    features: boolean[],
    users: Set<User>
  ) {
    this.beginTime = beginTime;
    this.endTime = endTime;
    this.features = features;
    this.users = users;
  }

  update(): void {
    this.endTime += TimeSlice.UNIT_TIME;
  }

  branch(noMores: Set<User>): TimeSlice {
    return new TimeSlice(
      this.beginTime,
      this.endTime + TimeSlice.UNIT_TIME,
      this.features,
      new Set([...this.users].filter(x => !noMores.has(x)))
    );
  }
}