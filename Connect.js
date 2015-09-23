"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

exports["default"] = _react2["default"].createClass({
    displayName: "Connect",

    componentDidMount: function componentDidMount() {
        var _props$store,
            _this = this;

        this.observer = (_props$store = this.props.store).query.apply(_props$store, _toConsumableArray(this.props.keyPaths)).forEach(function (state) {
            return _this.setState(state);
        });
    },

    componentWillUnmount: function componentWillUnmount() {
        this.observer.dispose();
    },

    getInitialState: function getInitialState() {
        return {};
    },

    render: function render() {
        var _this2 = this;

        return _react2["default"].createElement(
            "div",
            null,
            _react2["default"].Children.map(this.props.children, function (child) {
                return _react2["default"].cloneElement(child, _this2.state);
            })
        );
    }
});
module.exports = exports["default"];