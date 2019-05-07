export const dva = {
  config: {
    onError(err: ErrorEvent) {
      err.preventDefault();
    },
  },
};

export function render(oldRender) {
  oldRender();
}
