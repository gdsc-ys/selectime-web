import { Schedule } from "@/interfaces/Schedule";

export interface User {
  id: string;

  name: string /** 유저 이름 */;
  password: string /** 유저 비밀번호 */;
  availableSchedules: Schedule[] /** 모임 가능 일정 */;
}
