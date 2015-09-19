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

var _internalsStoreDebuggerHeader = require("./internals/StoreDebuggerHeader");

var _internalsStoreDebuggerHeader2 = _interopRequireDefault(_internalsStoreDebuggerHeader);

var _internalsStoreDebuggerSubHeader = require("./internals/StoreDebuggerSubHeader");

var _internalsStoreDebuggerSubHeader2 = _interopRequireDefault(_internalsStoreDebuggerSubHeader);

var _internalsStoreDebuggerControls = require("./internals/StoreDebuggerControls");

var _internalsStoreDebuggerControls2 = _interopRequireDefault(_internalsStoreDebuggerControls);

var _internalsStoreDebuggerState = require("./internals/StoreDebuggerState");

var _internalsStoreDebuggerState2 = _interopRequireDefault(_internalsStoreDebuggerState);

var _internalsStoreDebuggerPulltag = require("./internals/StoreDebuggerPulltag");

var _internalsStoreDebuggerPulltag2 = _interopRequireDefault(_internalsStoreDebuggerPulltag);

exports["default"] = _react2["default"].createClass({
    displayName: "StoreDebugger",

    className: "StoreDebugger",

    componentWillMount: function componentWillMount() {
        (0, _internalsLoadWebFonts2["default"])();
    },

    componentDidMount: function componentDidMount() {
        var _this = this;

        this.props.accountant.stream.forEach(function (_ref) {
            var transactions = _ref.transactions;
            var currentIndex = _ref.currentIndex;
            var locked = _ref.locked;

            _this.setState(_extends({}, _this.state, {
                transactions: transactions,
                currentIndex: currentIndex,
                backEnabled: currentIndex > 0,
                pauseEnabled: locked && transactions.length > 0,
                commitEnabled: !locked && transactions.length > 0,
                forwardEnabled: currentIndex < transactions.length - 1
            }));
        });
    },

    getInitialState: function getInitialState() {
        var styles = {
            container: _extends({}, _internalsStyles.MIXINS.absolutePick(0, null, 0, 0), _internalsStyles.MIXINS.transition({ width: "0.2s" }), {
                width: "0",
                maxWidth: "400px",
                position: "fixed",
                backgroundColor: _internalsStyles.COLORS.darkblue,
                fontFamily: "'Open Sans'"
            }),

            controls: {
                overflowX: "hidden"
            },

            states: _extends({}, _internalsStyles.MIXINS.absolutePick("70px", 0, 0, 0), {
                overflowX: "hidden",
                overflowY: "scroll"
            }),

            tab: _extends({}, _internalsStyles.MIXINS.absolutePick(null, null, "10px", "100%"), {
                marginLeft: "-1px",
                width: "60px",
                height: "30px"
            })
        };

        return { styles: styles, isOpen: false };
    },

    togglePanel: function togglePanel() {
        this.setState(_extends({}, this.state, {
            isOpen: !this.state.isOpen
        }));
    },

    handleControlClick: function handleControlClick(buttonTitle) {
        if (buttonTitle === "PREV") {
            this.props.accountant.rewind(1);
        } else if (buttonTitle === "NEXT") {
            this.props.accountant.fastForward(1);
        } else if (buttonTitle === "PAUSE") {
            this.props.accountant.pause();
        } else if (buttonTitle === "RESUME") {
            this.props.accountant.resume();
        } else if (buttonTitle === "COMMIT") {
            this.props.accountant.commit();
        }
    },

    render: function render() {
        var _this2 = this;

        var _state = this.state;
        var styles = _state.styles;
        var isOpen = _state.isOpen;
        var backEnabled = _state.backEnabled;
        var pauseEnabled = _state.pauseEnabled;
        var showPaused = _state.showPaused;
        var forwardEnabled = _state.forwardEnabled;
        var commitEnabled = _state.commitEnabled;
        var transactions = _state.transactions;
        var currentIndex = _state.currentIndex;

        console.log("TRANSACTIONS:", transactions);

        var containerStyle = _extends({}, styles.container, {
            width: isOpen ? "20%" : "0",
            minWidth: isOpen ? "200px" : null
        });

        return _react2["default"].createElement(
            "div",
            { style: containerStyle },
            _react2["default"].createElement(_internalsStoreDebuggerHeader2["default"], { content: "Storable" }),
            _react2["default"].createElement(
                "div",
                { style: styles.controls },
                _react2["default"].createElement(_internalsStoreDebuggerControls2["default"], { backEnabled: backEnabled,
                    pauseEnabled: pauseEnabled,
                    showPaused: transactions && transactions.length > 0,
                    forwardEnabled: forwardEnabled,
                    commitEnabled: commitEnabled,
                    onClick: this.handleControlClick })
            ),
            _react2["default"].createElement(
                "div",
                { style: styles.states },
                (0, _lodashCollectionMap2["default"])(this.state.transactions, function (transaction, index) {
                    return _react2["default"].createElement(_internalsStoreDebuggerState2["default"], { delta: transaction.delta,
                        isCurrent: index === currentIndex,
                        isValid: index <= currentIndex,
                        index: index,
                        onClick: _this2.props.accountant.goto,
                        key: "debugState" + index });
                })
            ),
            _react2["default"].createElement(
                "div",
                { style: styles.tab },
                _react2["default"].createElement(_internalsStoreDebuggerPulltag2["default"], { content: "Debug",
                    onClick: this.togglePanel })
            )
        );
    }
});
module.exports = exports["default"];