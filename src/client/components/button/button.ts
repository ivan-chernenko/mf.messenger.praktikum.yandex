import {Component} from '../../lib/component/component.js';
import {ButtonProps} from './types.js';
import {template} from './template.js';

export class Button extends Component<ButtonProps> {
    constructor(props: ButtonProps) {
        super('button', props);
    }

    render() {
        const templateExecutor = _.template(template);
        return templateExecutor(this.props);
    }
};