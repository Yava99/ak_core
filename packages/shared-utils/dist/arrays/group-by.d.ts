export declare function groupBy<T, TKey extends PropertyKey>(items: readonly T[], getKey: (item: T) => TKey): Record<TKey, T[]>;
