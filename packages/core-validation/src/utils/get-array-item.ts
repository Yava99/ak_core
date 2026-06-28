export function getArrayItem<T>(array: readonly T[], index: number): T {
  const item = array[index];

  if (item === undefined) {
    throw new Error(`Missing array item at index ${index}`);
  }

  return item;
}