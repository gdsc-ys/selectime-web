import { Date, Time, WeekDay } from "./DateTime";
import { User } from "./User";

export type Meet = (OneOffMeet | WeeklyMeet) & {
  id: string;
  attendee: User[];
};

export interface OneOffMeet {
  type: "one-off";
  candidateTimes: Record<Date, Time[]>;
}

export interface WeeklyMeet {
  type: "weekly";
  candidateTimes: Record<WeekDay, Time[]>;
}
