var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { shallowEquals } from "../shallow-equal/index.js";
import { EventBus } from '../event-bus/index.js';
import { EVENTS } from "./events.js";
var Component = /** @class */ (function () {
    function Component(tagName, props) {
        var _this = this;
        if (tagName === void 0) { tagName = "div"; }
        this.init = function () {
            _this.createResources();
            _this.eventBus.emit(EVENTS.FLOW_RENDER);
            _this.eventBus.emit(EVENTS.FLOW_CDM);
        };
        this.makePropsProxy = function (props) { return new Proxy(props, {
            set: function (target, p, value) {
                var oldProps = __assign({}, target);
                target[p] = value;
                _this.eventBus.emit(EVENTS.FLOW_CDU, oldProps, target);
                return true;
            },
            deleteProperty: function (_, __) {
                throw new Error('нет доступ');
            }
        }); };
        this.createResources = function () {
            var tagName = _this.meta.tagName;
            _this.element = document.createElement(tagName);
        };
        this.getContent = function () {
            return _this.element;
        };
        this.setProps = function (nextProps) {
            if (!nextProps) {
                return;
            }
            Object.assign(_this.props, nextProps);
        };
        this._componentDidMount = function () {
            _this.componentDidMount(_this.props);
        };
        this._componentDidRender = function () {
            _this.componentDidRender();
        };
        this._componentDidUpdate = function (oldProps, newProps) {
            var isComponentNeedToBeUpdate = _this.componentDidUpdate(oldProps, newProps);
            if (isComponentNeedToBeUpdate)
                _this.eventBus.emit(EVENTS.FLOW_RENDER);
        };
        this._render = function () {
            _this.element.insertAdjacentHTML("afterbegin", _this.render());
            _this.eventBus.emit(EVENTS.FLOW_CDR);
        };
        this.show = function () {
            _this.element.style.visibility = 'visible';
        };
        this.hide = function () {
            _this.element.style.visibility = 'hidden';
        };
        var eventBus = new EventBus();
        this.meta = { tagName: tagName };
        this.props = this.makePropsProxy(props);
        this.registerEvents(eventBus);
        this.eventBus = eventBus;
        eventBus.emit(EVENTS.INIT);
    }
    Component.prototype.registerEvents = function (eventBus) {
        eventBus.on(EVENTS.INIT, this.init);
        eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount);
        eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate);
        eventBus.on(EVENTS.FLOW_CDR, this._componentDidRender);
        eventBus.on(EVENTS.FLOW_RENDER, this._render);
    };
    Component.prototype.componentDidMount = function (_) { };
    ;
    Component.prototype.componentDidRender = function () {
    };
    Component.prototype.componentDidUpdate = function (oldProps, newProps) {
        return !shallowEquals(oldProps, newProps);
    };
    ;
    Component.prototype.render = function () {
        return '';
    };
    ;
    return Component;
}());
export { Component };
//# sourceMappingURL=component.js.map