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
import { render } from '../../lib/render/index.js';
var InternalErrorPage = /** @class */ (function (_super) {
    __extends(InternalErrorPage, _super);
    function InternalErrorPage() {
        return _super.call(this, 'div', {}) || this;
    }
    InternalErrorPage.prototype.render = function () {
        var templateExecutor = _.template(template);
        return templateExecutor();
    };
    return InternalErrorPage;
}(Component));
export { InternalErrorPage };
var internalErrorPage = new InternalErrorPage();
render('.app', internalErrorPage);
//# sourceMappingURL=index.js.map