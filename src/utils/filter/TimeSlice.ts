import { User } from "../../interfaces/User";


export class TimeSlice {
  static UNIT_TIME = 900;

  beginTime: number;
  endTime: number;
  features: boolean[];
  users: Set<User>;

  n_feautre: number;
  lifeCount: number;
  safeCount: number;

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

    this.n_feautre = features.map(x => x ? 1 as number : 0 as number).reduce((x, y) => x + y)
    this.lifeCount = this.n_feautre;
    this.safeCount = 0;
  }

  resetCount(): void {
    this.lifeCount = this.n_feautre;
    this.safeCount = 0;
  }

  branch(forWhat: number, noMores: Set<User>): TimeSlice {
    const new_endTime = this.endTime + TimeSlice.UNIT_TIME;
    let new_features = [...this.features]; new_features[forWhat] = false;
    const new_users = new Set([...this.users].filter(x => !noMores.has(x)));
    return new TimeSlice(
      this.beginTime,
      new_endTime,
      new_features,
      new_users
    );
  }
}