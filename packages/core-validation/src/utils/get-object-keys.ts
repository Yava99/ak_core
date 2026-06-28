export function getObjectKeys<T extends Record<string, unknown>>(value: T): Array<keyof T & string> {
  return Object.keys(value) as Array<keyof T & string>;
}