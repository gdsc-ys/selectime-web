export type ValidationResult =
  | {
      isError: false;
      errorMsg?: undefined;
    }
  | {
      isError: true;
      errorMsg: string;
    };
