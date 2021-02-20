import {PlainObject} from "../object-helpers/index";

export const collectFormData = <DataType>(form: HTMLFormElement) => {
    return Array.from(form.elements)
        .filter((el: HTMLElement) => el.tagName === 'INPUT'
            && el.dataset['name'] !== 'repeat_password'
            && el.dataset['name'] !== 'repeatNewPassword'
        )
        .reduce((acc: PlainObject<string>, input: HTMLInputElement) => {
            acc[input.dataset['name'] as string] = input.value;
            return acc
        }, {}) as unknown as DataType;
};