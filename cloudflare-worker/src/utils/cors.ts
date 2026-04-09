const allowedPatterns = [
  /^https:\/\/.*\.surge\.sh$/,
  /^https:\/\/.*\.pages\.dev$/,
  /^https:\/\/preview\.pro\.ant\.design$/,
  /^http:\/\/localhost:\d+$/,
];

export const corsOrigin = (origin: string): boolean => {
  return allowedPatterns.some((pattern) => pattern.test(origin));
};
