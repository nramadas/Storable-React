"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styles = require("./styles");

var _StoreDebuggerObjectViewer = require("./StoreDebuggerObjectViewer");

var _StoreDebuggerObjectViewer2 = _interopRequireDefault(_StoreDebuggerObjectViewer);

var STYLES = {
    stateTemplate: {
        position: "relative",
        padding: "15px",
        borderBottom: "1px solid " + _styles.COLORS.blue,
        cursor: "pointer"
    },

    stateDesc: {
        fontSize: "18px",
        lineHeight: "28px",
        color: _styles.COLORS.white,
        fontFamily: "'Inconsolata'",
        overflowX: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
    },

    stateViewer: {
        marginTop: "15px",
        overflow: "hidden"
    },

    tab: _extends({}, _styles.MIXINS.absolutePick(null, 0, 0, null), {
        display: "none",
        height: "10px",
        width: "20px",
        backgroundColor: _styles.COLORS.blue
    })
};

exports["default"] = _react2["default"].createClass({
    displayName: "StoreDebuggerState",

    getInitialState: function getInitialState() {
        return { isHovered: false };
    },

    onClick: function onClick() {
        this.props.onClick(this.props.index);
    },

    onMouseEnter: function onMouseEnter() {
        this.setState(_extends({}, this.state, { isHovered: true }));
    },

    onMouseLeave: function onMouseLeave() {
        this.setState(_extends({}, this.state, { isHovered: false }));
    },

    render: function render() {
        var msg = JSON.stringify(this.props.delta);
        var containerColor = null;
        var descColor = this.props.isValid ? _styles.COLORS.white : _styles.COLORS.blue;

        if (this.state.isHovered) {
            containerColor = _styles.COLORS.blue;
            descColor = this.props.isValid ? _styles.COLORS.white : _styles.COLORS.sand;
        }

        var containerStyle = _extends({}, STYLES.stateTemplate, { backgroundColor: containerColor });
        var descStyle = _extends({}, STYLES.stateDesc, { color: descColor });
        var tabStyle = _extends({}, STYLES.tab, { display: this.props.isCurrent ? "block" : "none" });

        return _react2["default"].createElement(
            "div",
            { style: containerStyle,
                onClick: this.onClick,
                onMouseEnter: this.onMouseEnter,
                onMouseLeave: this.onMouseLeave },
            _react2["default"].createElement(
                "div",
                { style: descStyle },
                msg
            ),
            this.props.isValid ? _react2["default"].createElement(
                "div",
                { style: STYLES.stateViewer },
                _react2["default"].createElement(_StoreDebuggerObjectViewer2["default"], { displayName: "state",
                    displayItem: this.props.state })
            ) : null,
            _react2["default"].createElement("div", { style: tabStyle })
        );
    }
});
module.exports = exports["default"];