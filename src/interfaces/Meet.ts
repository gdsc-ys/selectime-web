import { User } from "@/interfaces/User";
import { Schedule } from "@/interfaces/Schedule";

export interface Meet {
  id: string;

  name?: string /** 모임 이름 */;
  type: "one-off" | "weekly" /** 모임 형태 */;
  online: boolean /** 온라인 가능 여부 */;
  offline: boolean /** 오프라인 가능 여부 */;
  candidateSchedules: Schedule[] /** 선택 가능한 일정 */;

  attendees: User[] /** 참여자 */;
}

export type FlatMeet = Omit<Meet, "attendees"> & {
  attendeeIds: User["id"][];
};
