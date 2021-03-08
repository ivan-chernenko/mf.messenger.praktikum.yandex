export type PlainObject<ValueType = unknown> = Record<string, ValueType>;

export type PlainObjectOrArray<ValueType = unknown> =
    | PlainObject<ValueType>
    | ValueType[];
