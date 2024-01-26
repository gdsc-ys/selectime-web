import { Schedule } from "../../interfaces/Schedule";


export interface AlterSchedule {
  timestamp: number;
  features: boolean[];
}

export function toAlter(schedule: Schedule): AlterSchedule {
  return {
    timestamp: schedule.timestamp,
    features: [schedule.online, schedule.offline]
  };
}

export function fromAlter(schedule: AlterSchedule): Schedule {
  return {
    timestamp: schedule.timestamp,
    online: schedule.features[0],
    offline: schedule.features[1]
  }
}