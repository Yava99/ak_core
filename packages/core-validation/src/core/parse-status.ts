export const OK = <T>(data: T) => ({
  success: true as const,
  data
});

export const FAIL = {
  success: false as const
};