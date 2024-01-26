import { User } from "../../interfaces/User";
import { AlterSchedule } from "./AlterSchedule";


export function getMinTimeInfo(schedules: AlterSchedule[], users: User[]): [Set<User>, number][] {
  const n_feature = schedules[0].features.length;

  function init(): [Set<User>, number] {
    let new_set = new Set([{ id: "", name: "", password: "", availableSchedules: [] } as User]);
    let new_time = Number.MAX_VALUE;
    return [new_set, new_time];
  }

  let result: [Set<User>, number][] = Array(n_feature).map(() => init());

  const zip: [AlterSchedule, User][] = schedules.map((x, i) => [x, users[i]]);
  for (const [schedule, user] of zip) {
    for (const [i, feature] of schedule.features.entries()) {
      if (feature) {
        if (result[i][1] > schedule.timestamp) {
          result[i][0].clear();
          result[i][0].add(user);
        }
        else if (result[i][1] == schedule.timestamp) {
          result[i][0].add(user);
        }
      }
    }
  }

  return result;
}