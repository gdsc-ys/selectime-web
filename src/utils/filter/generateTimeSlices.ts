import { Meet } from "../../interfaces/Meet";
import { Schedule } from "../../interfaces/Schedule";
import { User } from "../../interfaces/User";

import { TimeSlice } from "./TimeSlice";
import { AlterSchedule, toAlter } from "./AlterSchedule";
import { getMinTimeInfo } from "./utils";


function generateTimeSlices(meet: Meet): TimeSlice[] {
  const schedules: Schedule[][] = meet.attendee.map(x => x.availableSchedules);

  const n_attendee = meet.attendee.length + 1;

  let index = new Array(n_attendee).fill(0);
  let time = 0;

  let buffer: Set<TimeSlice> = new Set();
  let newbuf: Set<TimeSlice> = new Set();
  let result: TimeSlice[] = [];

  while (true) {
    const heads: AlterSchedule[] = index.map((i, u) => toAlter(schedules[u][i]));
    const minTimeInfo: [Set<User>, number][] = getMinTimeInfo(heads, meet.attendee);

    const time_1 = time + TimeSlice.UNIT_TIME;
    for (const [i, [featureSet, featureTime]] of minTimeInfo.entries()) {
      if (time_1 < featureTime) {
        for (const timeSlice of buffer) {
          if (timeSlice.features[i]) {
            timeSlice.lifeCount--;
            if (timeSlice.lifeCount == 0) {
              buffer.delete(timeSlice);
              result.push(timeSlice);
            }
          }
        }
      }

      else if (time_1 == featureTime) {
        for (const timeSlice of buffer) {
          if (timeSlice.features[i]) {
            if ( timeSlice.users )
            timeSlice.safeCount++;
            if (timeSlice.safeCount >= timeSlice.n_feautre) {
              newbuf.add(timeSlice);
            }
          }
        }
      }


    }

    for (let bufTimeSlice of buffer) {
      bufTimeSlice
    }
  }

  return result;
}