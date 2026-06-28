export interface IValidationRuntimeOptions {
  includeDebugMetadata: boolean;
}

const runtimeOptions: IValidationRuntimeOptions = {
  includeDebugMetadata: true
};

export function getValidationRuntimeOptions(): Readonly<IValidationRuntimeOptions> {
  return runtimeOptions;
}

export function setValidationRuntimeOptions(
  options: Partial<IValidationRuntimeOptions>
): void {
  if (typeof options.includeDebugMetadata === "boolean") {
    runtimeOptions.includeDebugMetadata = options.includeDebugMetadata;
  }
}