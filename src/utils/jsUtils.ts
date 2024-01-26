/**
 * string 으로 쓰여진 숫자를 Number로 변환하는 함수.
 * 빈 스트링인 경우, 숫자형식이 아니거나 NaN인 경우 null 반환
 */

export const parseNum = (str: string) => {
  if (str === "") return null;

  const parsed = Number(str.replace(/[^0-9+.]/g, ""));

  if (typeof parsed !== "number" || Number.isNaN(parsed)) return null;

  return parsed;
};
