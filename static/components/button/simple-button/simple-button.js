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
import { Component } from '../../../lib/component';
import { template } from './template';
import _ from '../../../../../node_modules/@types/lodash';
var SimpleButton = /** @class */ (function (_super) {
    __extends(SimpleButton, _super);
    function SimpleButton(props) {
        return _super.call(this, 'button', props) || this;
    }
    SimpleButton.prototype.render = function () {
        //@ts-ignore
        var tmp = _.template(template);
        return tmp(this.props);
    };
    return SimpleButton;
}(Component));
export { SimpleButton };
;
//# sourceMappingURL=simple-button.js.map