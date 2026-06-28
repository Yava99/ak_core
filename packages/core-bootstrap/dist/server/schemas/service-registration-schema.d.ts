import { type BaseSchema } from "@fivem/core-validation";
export interface IServiceRegistrationInput {
    name: string;
    service: unknown;
}
export declare const ServiceRegistrationSchema: BaseSchema<IServiceRegistrationInput>;
