"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styles = require("./styles");

exports["default"] = _react2["default"].createClass({
    displayName: "StoreDebuggerSubHeader",

    getInitialState: function getInitialState() {
        var styles = {
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

        return { styles: styles };
    },

    render: function render() {
        return _react2["default"].createElement(
            "div",
            { style: this.state.styles.subheader },
            this.props.content
        );
    }
});
module.exports = exports["default"];