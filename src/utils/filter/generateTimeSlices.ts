import { Meet } from "../../interfaces/Meet";
import { Schedule } from "../../interfaces/Schedule";
import { User } from "../../interfaces/User";

import { TimeSlice } from "./TimeSlice";
import { AlterSchedule, toAlter } from "./AlterSchedule";
import { getMinTimeInfo } from "./utils";


export function generateTimeSlices(meet: Meet): TimeSlice[] {
  const schedules: Schedule[][] = meet.attendee.map(x => x.availableSchedules.concat([{
    timestamp: Number.MAX_VALUE, online: false, offline: false
  }]));

  const n_attendee = meet.attendee.length + 1;

  let index = new Array(n_attendee).fill(0);

  const n_feature = 2;
  let buffer: Set<TimeSlice>[] = new Array(n_feature).map(() => new Set());
  let result: TimeSlice[] = [];

  // 모든 index가 끝에 도달할 때까지 반복
  while (!index.every((x, i) => x == schedules[i].length-1)) {
    const heads: AlterSchedule[] = index.map((i, u) => toAlter(schedules[u][i]));
    const minTimeInfo: [Set<User>, number][] = getMinTimeInfo(heads, meet.attendee);
    const time = Math.min(...minTimeInfo.map(x => x[1]));
    const time_1 = time + TimeSlice.UNIT_TIME;
    // feature별 준비된 사람들의 set과 최소 time
    for (const [i, [featureSet, featureTime]] of minTimeInfo.entries()) {
      if (index[i] == schedules[i].length-1) {
        continue;
      }

      // time이 연결되지 않으면
      if (time_1 < featureTime) {
        // 해당 feature의 buffer를 통째로 날림
        result.push(...buffer[i]);
        buffer[i].clear();
      }

      // time이 연결되면
      else if (time_1 == featureTime) {
        // 해당 feature의 buffer에 대해
        for (const timeSlice of buffer[i]) {
          // 인원이 모두 포함되면
          if ([...timeSlice.users].every(x => featureSet.has(x))) {
            // 기존 slice는 유지
            timeSlice.update();
            // 인원이 초과일 경우
            if (featureSet.size > timeSlice.users.size) {
              // 새 slice 생성
              let newFeatures = new Array(n_feature).fill(false);
              newFeatures[i] = true;
              const newSlice = new TimeSlice(time, time, newFeatures, featureSet);
              buffer[i].add(newSlice);
            }
          }
          // 인원이 모두 포함되지 않으면
          else {
            // 분기
            const diff = new Set([...featureSet].filter(x => !timeSlice.users.has(x)));
            buffer[i].add(timeSlice.branch(diff));
            // 기존 slice는 result로
            result.push(timeSlice);
            buffer[i].delete(timeSlice);
            // 새 slice도 만들어줌
            let newFeatures = Array(n_feature).fill(false);
            newFeatures[i] = true;
            const newSlice = new TimeSlice(time, time, newFeatures, featureSet);
            buffer[i].add(newSlice);
          }
        }

        if (index[i] < schedules[i].length-1) {
          index[i]++;
        }
      }
    }
  }

  return result;
}