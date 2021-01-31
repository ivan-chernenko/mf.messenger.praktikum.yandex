var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component } from '../../lib/component/index.js';
import { template } from './template.js';
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input(props) {
        return _super.call(this, 'div', props) || this;
    }
    Input.prototype.render = function () {
        if (this.props.hasError)
            this.props.inputClassName += 'input__input_hasError';
        else
            this.props.inputClassName = this.props.inputClassName.replace('input__input_hasError', '');
        var templateExecutor = _.template(template);
        return templateExecutor(this.props);
    };
    return Input;
}(Component));
export { Input };
//# sourceMappingURL=input.js.map