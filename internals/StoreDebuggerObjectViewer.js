"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodashLangIsArray = require("lodash/lang/isArray");

var _lodashLangIsArray2 = _interopRequireDefault(_lodashLangIsArray);

var _lodashLangIsObject = require("lodash/lang/isObject");

var _lodashLangIsObject2 = _interopRequireDefault(_lodashLangIsObject);

var _lodashLangIsString = require("lodash/lang/isString");

var _lodashLangIsString2 = _interopRequireDefault(_lodashLangIsString);

var _lodashLangIsFunction = require("lodash/lang/isFunction");

var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);

var _styles = require("./styles");

var TITLE_FONT_SIZE = "14px";
var TITLE_LINE_HEIGHT = "22px";
var TITLE_MARGIN_RIGHT = "10px";

var TITLE_BASE_STYLE = {
    marginRight: TITLE_MARGIN_RIGHT,
    fontSize: TITLE_FONT_SIZE,
    lineHeight: TITLE_LINE_HEIGHT,
    display: "inline-block",
    verticalAlign: "middle"
};

var STYLES = {
    arrow: _extends({}, TITLE_BASE_STYLE, {
        color: _styles.COLORS.green,
        width: "15px"
    }),

    displayName: _extends({}, TITLE_BASE_STYLE, {
        color: _styles.COLORS.maize
    }),

    displayType: _extends({}, TITLE_BASE_STYLE, {
        color: _styles.COLORS.orange
    }),

    opener: _extends({}, TITLE_BASE_STYLE, {
        color: _styles.COLORS.green
    }),

    closer: _extends({}, TITLE_BASE_STYLE, {
        color: _styles.COLORS.green
    }),

    keyCount: _extends({}, TITLE_BASE_STYLE, {
        color: _styles.COLORS.sand
    }),

    children: {
        paddingLeft: "10px",
        overflow: "hidden",
        color: _styles.COLORS.sand
    },

    arrayItem: {
        paddingLeft: "25px",
        fontSize: TITLE_FONT_SIZE,
        lineHeight: TITLE_LINE_HEIGHT
    },

    arrayItemIndex: {
        marginRight: "10px",
        color: _styles.COLORS.maize
    },

    arrayItemValue: {
        color: _styles.COLORS.sand
    }
};

var StoreDebugggerObjectViewer = _react2["default"].createClass({
    displayName: "StoreDebugggerObjectViewer",

    getInitialState: function getInitialState() {
        return {
            isOpen: false
        };
    },

    toggleOpen: function toggleOpen(event) {
        event.stopPropagation();
        this.setState({ isOpen: !this.state.isOpen });
    },

    render: function render() {
        var _props = this.props;
        var displayItem = _props.displayItem;
        var displayName = _props.displayName;

        var children = null;
        var opener = null;
        var closer = null;
        var keyCount = null;
        var content = null;
        var displayType = null;
        var showArrow = false;

        if ((0, _lodashLangIsArray2["default"])(displayItem)) {
            opener = "[";
            closer = "]";
            keyCount = displayItem.length;
            displayType = "Array";
            showArrow = true;
            children = displayItem.map(function (value, index) {
                return _react2["default"].createElement(
                    "div",
                    { style: STYLES.arrayItem },
                    _react2["default"].createElement(
                        "span",
                        { style: STYLES.arrayItemIndex },
                        index + ":"
                    ),
                    _react2["default"].createElement(
                        "span",
                        { style: STYLES.arrayItemValue },
                        value
                    )
                );
            });
        } else if ((0, _lodashLangIsFunction2["default"])(displayItem)) {
            displayType = String(displayItem);
        } else if ((0, _lodashLangIsObject2["default"])(displayItem)) {
            opener = "{";
            closer = "}";
            keyCount = Object.keys(displayItem).length;
            displayType = displayItem.constructor.name;
            showArrow = true;
            children = Object.keys(displayItem).map(function (key) {
                return _react2["default"].createElement(StoreDebugggerObjectViewer, { displayName: key, displayItem: displayItem[key] });
            });
        } else if ((0, _lodashLangIsString2["default"])(displayItem)) {
            displayType = "\"" + displayItem + "\"";
        } else {
            displayType = String(displayItem);
        }

        return _react2["default"].createElement(
            "div",
            { onClick: this.toggleOpen },
            showArrow ? _react2["default"].createElement(
                "div",
                { style: STYLES.arrow },
                this.state.isOpen ? String.fromCharCode(9660) : String.fromCharCode(9658)
            ) : _react2["default"].createElement("div", { style: STYLES.arrow }),
            _react2["default"].createElement(
                "div",
                { style: STYLES.displayName },
                displayName + ":"
            ),
            _react2["default"].createElement(
                "div",
                { style: STYLES.displayType },
                displayType
            ),
            !this.state.isOpen && opener ? _react2["default"].createElement(
                "div",
                { style: STYLES.opener },
                opener
            ) : null,
            showArrow ? this.state.isOpen ? _react2["default"].createElement(
                "div",
                { style: STYLES.children },
                children
            ) : _react2["default"].createElement(
                "div",
                { style: STYLES.keyCount },
                keyCount
            ) : null,
            !this.state.isOpen && closer ? _react2["default"].createElement(
                "div",
                { style: STYLES.closer },
                closer
            ) : null
        );
    }
});

exports["default"] = StoreDebugggerObjectViewer;
module.exports = exports["default"];