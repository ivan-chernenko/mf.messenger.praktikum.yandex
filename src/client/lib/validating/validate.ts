import {Input} from "../../components/input/index";
import {Component} from "../component";
import {Schema} from "./types";

const getValue = (inputComponent: Input): string => {
    return inputComponent.getContent().querySelector('input')?.value ?? '';
};

export const defaultValidateFn = (inputComponent: Input) => {
    const value = getValue(inputComponent);
    if (!value) {
        inputComponent.showError();
        return false;
    }
    return true;
};

export const validateEmail = (inputComponent: Input) => {
    if (!defaultValidateFn(inputComponent))
        return false;
    const EMAIL_REG_EXP = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    const value = getValue(inputComponent);
    if (!EMAIL_REG_EXP.test(value)) {
        inputComponent.showError();
        return false;
    }
    return true;
};

export const validatePhone = (inputComponent: Input) => {
    if (!defaultValidateFn(inputComponent))
        return false;
    const PHONE_REG_EXP = /^((\+7|7|8)+([0-9]){10})$/;
    const value = getValue(inputComponent);
    if (!PHONE_REG_EXP.test(value)) {
        inputComponent.showError();
        return false;
    }
    return true;
}

export const validateRepeatPassword = (selector: string) => (inputComponent: Input) => {
    if (!defaultValidateFn(inputComponent))
        return false;
    const value = getValue(inputComponent);
    const passwordValue = (document.querySelector(selector) as HTMLInputElement)?.value ?? '';
    if (passwordValue !== value) {
        inputComponent.showError();
        return false;
    }
    return true;
};

export const initValidating = (children: Component<unknown>[], schema: Schema) => {
    const inputs = children.filter(ch => ch
        .getContent()
        .querySelector('input')
        ?.tagName === 'INPUT'
    ) as Input[];
    inputs.forEach(input => {
        input.setProps({
            onBlur: () => schema.find(el => el.name === input.getName())?.fn(input),
        })
    })
};

export const validateInputs = (children: Component<unknown>[], schema: Schema) => {
    let isValid = true;
    const inputs = children.filter(ch => ch
        .getContent()
        .querySelector('input')
        ?.tagName === 'INPUT'
    ) as Input[];
    inputs.forEach(input => {
        if (!schema.find(el => el.name === input.getName())?.fn(input))
            isValid = false;
    });
    return isValid;
};