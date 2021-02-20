import {Component} from '../../lib/component/index';
import {InputProps} from './types';
import {template} from './template';

export class Input extends Component<InputProps> {
    constructor(props: InputProps) {
        super(props.root, {
            ...props,
            errorText: props.errorText ?? 'Поле является обязательным',
            labelClassName: props.labelClassName ?? '',
            inputClassName: props.inputClassName ?? '',
            name: props.name ?? '',
            title: props.title ?? '',
        });
    }

    showError() {
        const input = this.getContent().querySelector('input');
        const error = this.getContent().querySelector('span');
        if (input && error) {
            error.classList.add('input__error-text_visible');
            input.classList.add('input__input_has-error');
        }
    }

    hideError() {
        const input = this.getContent().querySelector('input');
        const error = this.getContent().querySelector('span');
        if (input && error) {
            error.classList.remove('input__error-text_visible');
            input.classList.remove('input__input_has-error');
        }
    }

    onFocus = (e: FocusEvent) => {
        this.hideError();
        if (this.props.onFocus)
            this.props.onFocus(e);
    };

    onBlur = (e: FocusEvent) => {
        if (this.props.onBlur)
            this.props.onBlur(e);
    };

    componentDidRender() {
        const input = this.getContent().querySelector('input');
        if (input) {
            input.onfocus = this.onFocus;
            input.onblur = this.onBlur;
            if (this.props.value)
                input.value = this.props.value;
        }
    }

    render(): string {
        return template;
    }
}