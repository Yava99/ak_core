export declare const MODULE_LIFECYCLE: {
    readonly REGISTERING: "registering";
    readonly REGISTERED: "registered";
    readonly FAILED: "failed";
};
export type ModuleLifecycleState = (typeof MODULE_LIFECYCLE)[keyof typeof MODULE_LIFECYCLE];
