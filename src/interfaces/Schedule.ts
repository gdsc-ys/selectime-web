export interface Schedule {
  timestamp: number /** Unix timestamp (15분 단위) */;
  online: boolean /** 온라인 가능 여부 */;
  offline: boolean /** 오프라인 가능 여부 */;
}
