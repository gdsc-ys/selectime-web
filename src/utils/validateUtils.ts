import { ValidationResult } from "@/interfaces/Common";

export const validateMeetName = (name: string): ValidationResult => {
  if (name.trim().length < 3 || name.trim().length > 15) {
    return {
      isError: true,
      errorMsg: "모임 이름은 3자 이상 15자 이내여야 합니다.",
    };
  }

  return {
    isError: false,
  };
};

export const validateUserName = (name: string): ValidationResult => {
  if (name.trim().length < 1 || name.trim().length > 15) {
    return {
      isError: true,
      errorMsg: "이름은 1자 이상 15자 이내여야 합니다.",
    };
  }

  return {
    isError: false,
  };
};
