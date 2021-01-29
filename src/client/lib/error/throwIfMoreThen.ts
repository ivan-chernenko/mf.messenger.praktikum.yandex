
export const throwIfMoreThen = (errorText: string) => (value: number, moreThen: number) => {
    if (value > moreThen)
        throw new Error(errorText)
};