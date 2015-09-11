"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styles = require("./styles");

exports["default"] = _react2["default"].createClass({
    displayName: "StoreDebuggerHeader",

    getInitialState: function getInitialState() {
        var styles = {
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

        return { styles: styles };
    },

    render: function render() {
        return _react2["default"].createElement(
            "div",
            { style: this.state.styles.header },
            this.props.content
        );
    }
});
module.exports = exports["default"];