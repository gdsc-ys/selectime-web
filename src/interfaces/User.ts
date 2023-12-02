import { Date, Time, WeekDay } from "./DateTime";

export interface User {
  id: string /** Auto Generated */;
  meetId: string;
  password: string;
  availableTimes: Record<Date | WeekDay, Time[]>;
}
