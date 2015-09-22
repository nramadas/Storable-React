"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styles = require("./styles");

var BUTTON_HEIGHT = "19px";
var HALF_HEIGHT = "9px";

var STYLES = {
    button: _extends({}, _styles.MIXINS.userSelect("none"), {
        display: "inline-block",
        verticalAlign: "top",
        height: BUTTON_HEIGHT,
        width: "25%",
        cursor: "pointer"
    }),

    line: {
        display: "inline-block",
        verticalAlign: "top",
        height: HALF_HEIGHT,
        width: "10%",
        borderBottom: "1px solid " + _styles.COLORS.cyan
    },

    buttonTitle: _extends({}, _styles.MIXINS.borderbox(), {
        display: "inline-block",
        verticalAlign: "top",
        height: BUTTON_HEIGHT,
        lineHeight: "17px",
        fontSize: "12px",
        width: "80%",
        color: _styles.COLORS.cyan,
        textAlign: "center",
        border: "1px solid " + _styles.COLORS.cyan,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
    })
};

exports["default"] = _react2["default"].createClass({
    displayName: "StoreDebuggerControls",

    renderButton: function renderButton(buttonTitle, enabled) {
        var _this = this;

        var buttonTitleStyle = _extends({}, STYLES.buttonTitle, {
            color: enabled ? _styles.COLORS.cyan : _styles.COLORS.blue,
            borderColor: enabled ? _styles.COLORS.cyan : _styles.COLORS.blue
        });

        return _react2["default"].createElement(
            "div",
            { style: STYLES.button, onClick: function () {
                    return enabled && _this.props.onClick(buttonTitle);
                } },
            _react2["default"].createElement("div", { style: STYLES.line }),
            _react2["default"].createElement(
                "div",
                { style: buttonTitleStyle },
                buttonTitle
            ),
            _react2["default"].createElement("div", { style: STYLES.line })
        );
    },

    render: function render() {
        var _this2 = this;

        var buttons = [["PREV", this.props.backEnabled], [this.props.pauseEnabled ? "PAUSE" : "RESUME", this.props.showPaused], ["COMMIT", this.props.commitEnabled], ["NEXT", this.props.forwardEnabled]];

        return _react2["default"].createElement(
            "div",
            null,
            buttons.map(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2);

                var buttonTitle = _ref2[0];
                var enabled = _ref2[1];
                return _this2.renderButton(buttonTitle, enabled);
            })
        );
    }
});
module.exports = exports["default"];