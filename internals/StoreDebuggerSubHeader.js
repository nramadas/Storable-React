"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styles = require("./styles");

var STYLES = {
    subheader: {
        height: "64px",
        textAlign: "center",
        fontSize: "32px",
        lineHeight: "52px",
        color: _styles.COLORS.cyan,
        borderBottom: "1px solid " + _styles.COLORS.blue,
        overflow: "hidden"
    }
};

exports["default"] = _react2["default"].createClass({
    displayName: "StoreDebuggerSubHeader",

    render: function render() {
        return _react2["default"].createElement(
            "div",
            { style: STYLES.subheader },
            this.props.content
        );
    }
});
module.exports = exports["default"];