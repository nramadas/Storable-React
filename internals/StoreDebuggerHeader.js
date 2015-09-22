"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styles = require("./styles");

var STYLES = {
    header: {
        height: "48px",
        textAlign: "center",
        fontSize: "24px",
        lineHeight: "48px",
        fontStyle: "italic",
        color: _styles.COLORS.cyan,
        overflow: "hidden"
    }
};

exports["default"] = _react2["default"].createClass({
    displayName: "StoreDebuggerHeader",

    render: function render() {
        return _react2["default"].createElement(
            "div",
            { style: STYLES.header },
            this.props.content
        );
    }
});
module.exports = exports["default"];