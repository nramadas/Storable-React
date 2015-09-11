"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodashCollectionMap = require("lodash/collection/map");

var _lodashCollectionMap2 = _interopRequireDefault(_lodashCollectionMap);

var COLORS = {
    darkblue: "#193441",
    blue: "#3E606F",
    cyan: "#91AA9D",
    sand: "#D1DBBD",
    white: "#FCFFF5"
};

var MIXINS = {
    absolutePick: function absolutePick(top, right, bottom, left) {
        var style = { position: "absolute" };
        if (top !== null && top !== undefined) {
            style["top"] = top;
        };
        if (right !== null && right !== undefined) {
            style["right"] = right;
        };
        if (bottom !== null && bottom !== undefined) {
            style["bottom"] = bottom;
        };
        if (left !== null && left !== undefined) {
            style["left"] = left;
        };
        return style;
    },

    transition: function transition() {
        var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var str = (0, _lodashCollectionMap2["default"])(properties, function (value, key) {
            return key + " " + value;
        }).join(", ");

        return {
            WebkitTransition: "-webkit-transform, " + str,
            MozTransition: "-moz-transform, " + str,
            transition: "transform, " + str
        };
    },

    borderbox: function borderbox() {
        return {
            boxSizing: "border-box",
            MozBoxSizing: "border-box",
            WebkitBoxSizing: "border-box"
        };
    }
};

exports["default"] = { COLORS: COLORS, MIXINS: MIXINS };
module.exports = exports["default"];