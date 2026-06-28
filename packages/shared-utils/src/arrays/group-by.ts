export function groupBy<T, TKey extends PropertyKey>(
  items: readonly T[],
  getKey: (item: T) => TKey
): Record<TKey, T[]> {
  return items.reduce(
    (accumulator, item) => {
      const key = getKey(item);

      if (!accumulator[key]) {
        accumulator[key] = [];
      }

      accumulator[key].push(item);
      return accumulator;
    },
    {} as Record<TKey, T[]>
  );
}