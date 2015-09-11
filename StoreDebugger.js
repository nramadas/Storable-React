"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodashCollectionMap = require("lodash/collection/map");

var _lodashCollectionMap2 = _interopRequireDefault(_lodashCollectionMap);

var _internalsLoadWebFonts = require("./internals/loadWebFonts");

var _internalsLoadWebFonts2 = _interopRequireDefault(_internalsLoadWebFonts);

var _internalsStyles = require("./internals/styles");

var _internalsStoreDebuggerState = require("./internals/StoreDebuggerState");

var _internalsStoreDebuggerState2 = _interopRequireDefault(_internalsStoreDebuggerState);

exports["default"] = _react2["default"].createClass({
    displayName: "StoreDebugger",

    componentWillMount: function componentWillMount() {
        (0, _internalsLoadWebFonts2["default"])();
    },

    componentDidMount: function componentDidMount() {
        var _this = this;

        this.props.accountant.stream.forEach(function (_ref) {
            var transactions = _ref.transactions;
            var currentIndex = _ref.currentIndex;

            _this.setState(_extends({}, _this.state, { transactions: transactions, currentIndex: currentIndex }));
        });
    },

    getInitialState: function getInitialState() {
        var styles = {
            container: _extends({}, _internalsStyles.MIXINS.absolutePick(0, "100%", 0, 0), _internalsStyles.MIXINS.transition({ right: "0.2s" }), {
                position: "fixed",
                backgroundColor: _internalsStyles.COLORS.darkblue,
                fontFamily: "'Open Sans'"
            }),

            header: {
                height: "48px",
                textAlign: "center",
                fontSize: "24px",
                lineHeight: "64px",
                fontStyle: "italic",
                color: _internalsStyles.COLORS.cyan,
                overflow: "hidden"
            },

            subheader: {
                height: "64px",
                textAlign: "center",
                fontSize: "32px",
                lineHeight: "52px",
                color: _internalsStyles.COLORS.cyan,
                borderBottom: "1px solid " + _internalsStyles.COLORS.blue,
                overflow: "hidden"
            },

            states: {
                overflowX: "hidden",
                overflowY: "scroll"
            },

            tab: _extends({}, _internalsStyles.MIXINS.absolutePick(null, null, "10px", "100%"), {
                width: "60px",
                height: "30px",
                marginLeft: "-1px",
                border: "1px solid " + _internalsStyles.COLORS.darkblue,
                color: _internalsStyles.COLORS.darkblue,
                textAlign: "center",
                fontSize: "14px",
                lineHeight: "30px",
                fontFamily: "'Open Sans'",
                cursor: "pointer"
            })
        };

        return { styles: styles, isOpen: false };
    },

    togglePanel: function togglePanel() {
        this.setState(_extends({}, this.state, {
            isOpen: !this.state.isOpen
        }));
    },

    render: function render() {
        var _this2 = this;

        var _state = this.state;
        var styles = _state.styles;
        var isOpen = _state.isOpen;

        var containerStyle = _extends({}, styles.container, {
            right: isOpen ? "80%" : "100%"
        });

        var states = (0, _lodashCollectionMap2["default"])(this.state.transactions, function (transaction, index) {
            return _react2["default"].createElement(_internalsStoreDebuggerState2["default"], { delta: transaction.delta,
                isCurrent: index === _this2.state.currentIndex,
                isValid: index <= _this2.state.currentIndex,
                index: index,
                onClick: _this2.props.accountant.goto,
                key: "debugState" + index });
        });

        return _react2["default"].createElement(
            "div",
            { style: containerStyle },
            _react2["default"].createElement(
                "div",
                { style: styles.header },
                "Storable"
            ),
            _react2["default"].createElement(
                "div",
                { style: styles.subheader },
                "DEV TOOLS"
            ),
            _react2["default"].createElement(
                "div",
                { style: styles.states },
                states
            ),
            _react2["default"].createElement(
                "div",
                { style: styles.tab, onClick: this.togglePanel },
                "Debug"
            )
        );
    }
});
module.exports = exports["default"];