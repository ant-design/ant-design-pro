export const dva = {
  config: {
    onError(err: ErrorEvent) {
      err.preventDefault();
    },
  },
};
