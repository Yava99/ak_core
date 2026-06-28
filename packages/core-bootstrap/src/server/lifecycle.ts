export const MODULE_LIFECYCLE = {
  REGISTERING: "registering",
  REGISTERED: "registered",
  FAILED: "failed"
} as const;

export type ModuleLifecycleState =
  (typeof MODULE_LIFECYCLE)[keyof typeof MODULE_LIFECYCLE];