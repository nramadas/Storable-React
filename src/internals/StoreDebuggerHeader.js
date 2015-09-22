import React            from "react";
import {COLORS, MIXINS} from "./styles";

const STYLES = {
    header: {
        height: "48px",
        textAlign: "center",
        fontSize: "24px",
        lineHeight: "48px",
        fontStyle: "italic",
        color: COLORS.cyan,
        overflow: "hidden",
    },
};

export default React.createClass({
    render() {
        return (
            <div style={STYLES.header}>{this.props.content}</div>
        )
    },
});
