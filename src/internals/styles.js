import map from "lodash/collection/map";

const COLORS = {
    darkblue: "#193441",
    blue: "#3E606F",
    cyan: "#91AA9D",
    sand: "#D1DBBD",
    maize: "#FFCA00",
    white: "#FCFFF5",
    green: "#00E543",
    orange: "#FF6E00",
}

const MIXINS = {
    absolutePick(top, right, bottom, left) {
        const style = {position: "absolute"};
        if (top !== null && top !== undefined) { style["top"] = top };
        if (right !== null && right !== undefined) { style["right"] = right };
        if (bottom !== null && bottom !== undefined) { style["bottom"] = bottom };
        if (left !== null && left !== undefined) { style["left"] = left };
        return style;
    },

    transition(properties={}) {
        let str = map(properties, (value, key) => `${key} ${value}`).join(", ");

        return {
            WebkitTransition: `-webkit-transform, ${str}`,
            MozTransition: `-moz-transform, ${str}`,
            transition: `transform, ${str}`,
        };
    },

    borderbox() {
        return {
            boxSizing: "border-box",
            MozBoxSizing: "border-box",
            WebkitBoxSizing: "border-box",
        };
    },

    userSelect(value) {
        return {
            MozUserSelect: value,
            WebkitUserSelect: value,
            MsUserSelect: value,
        };
    },
}

export default {COLORS, MIXINS};
