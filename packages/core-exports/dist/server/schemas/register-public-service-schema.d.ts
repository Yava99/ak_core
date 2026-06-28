import { type BaseSchema } from "@fivem/core-validation";
export interface IRegisterPublicServiceInput {
    moduleName: string;
    serviceName: string;
    service: unknown | (() => unknown);
}
export declare const RegisterPublicServiceSchema: BaseSchema<IRegisterPublicServiceInput>;
