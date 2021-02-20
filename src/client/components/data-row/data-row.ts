import {Component} from '../../lib/component/index';
import {DataRowProps} from './types';
import {template} from './template';

export class DataRow extends Component<DataRowProps> {
    constructor(props: DataRowProps) {
        super(props.root, {
            ...props,
            labelClassName: props.labelClassName ?? '',
            valueClassName: props.valueClassName ?? '',
            value: props.value ?? '',
        });
    }

    render(): string {
        return template;
    }
}