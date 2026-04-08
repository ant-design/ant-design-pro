const allowedPatterns = [
  /^https:\/\/[\w-]+\.surge\.sh$/,
  /^https:\/\/[\w-]+\.pages\.dev$/,
  /^https:\/\/preview\.pro\.ant\.design$/,
  /^http:\/\/localhost:\d+$/,
];

export const corsOrigin = (origin: string): boolean => {
  return allowedPatterns.some((pattern) => pattern.test(origin));
};
