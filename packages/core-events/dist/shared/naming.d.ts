export declare function assertValidLocalEventName(name: string): void;
export declare function assertValidNetEventName(name: string): void;
export declare function buildLocalEventName(moduleName: string, eventName: string): string;
export declare function buildNetEventName(moduleName: string, eventName: string): string;
export declare function defineLocalEvent<TModuleName extends string, TEventName extends string>(moduleName: TModuleName, eventName: TEventName): `${TModuleName}:${TEventName}`;
export declare function defineNetEvent<TModuleName extends string, TEventName extends string>(moduleName: TModuleName, eventName: TEventName): `${TModuleName}:net:${TEventName}`;
