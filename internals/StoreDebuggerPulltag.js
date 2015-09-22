"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styles = require("./styles");

var STYLES = {
    tab: {
        width: "60px",
        height: "30px",
        border: "1px solid " + _styles.COLORS.darkblue,
        color: _styles.COLORS.darkblue,
        textAlign: "center",
        fontSize: "14px",
        lineHeight: "30px",
        fontFamily: "'Open Sans'",
        cursor: "pointer"
    }
};

exports["default"] = _react2["default"].createClass({
    displayName: "StoreDebuggerPulltag",

    render: function render() {
        return _react2["default"].createElement(
            "div",
            { style: STYLES.tab, onClick: this.props.onClick },
            this.props.content
        );
    }
});
module.exports = exports["default"];