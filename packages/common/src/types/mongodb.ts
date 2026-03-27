export type Projection<T extends object & { _id: unknown }> = Partial<Record<keyof T, 1 | 0>>;
