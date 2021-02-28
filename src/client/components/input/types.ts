export interface InputProps {
    root: string;
    title?: string;
    inputClassName?: string;
    labelClassName?: string;
    onFocus?: (e?: FocusEvent) => void;
    onBlur?: (e?: FocusEvent) => void;
    placeholder?: string;
    type: string;
    name?: string;
    errorText?: string;
    value?: string;
}
