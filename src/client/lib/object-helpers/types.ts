export type PlainObject<ValueType = unknown> = {
    [key in string]: ValueType;
};

export type PlainObjectOrArray<ValueType = unknown> =
    | PlainObject<ValueType>
    | ValueType[];
