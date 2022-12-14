export const REGEX = {
  password: /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9.?/-]{8,24}$/,
  mailAddress: /[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
  date: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
  dateTime:
    /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]) ([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
};
