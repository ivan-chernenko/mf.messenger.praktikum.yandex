import {Component} from '../../lib/component/index.js';
import {InputProps} from './types.js';
import {template} from './template.js';

export class Input extends Component<InputProps> {
    constructor(props: InputProps) {
        super('div', props);
    }

    render(): string {
        if (this.props.hasError)
            this.props.inputClassName += 'input__input_hasError';
        else
            this.props.inputClassName = this.props.inputClassName.replace('input__input_hasError', '');
        const templateExecutor = _.template(template);
        return templateExecutor(this.props);
    }
}