import React            from "react";
import {COLORS, MIXINS} from "./styles";

const STYLES = {
    subheader: {
        height: "64px",
        textAlign: "center",
        fontSize: "32px",
        lineHeight: "52px",
        color: COLORS.cyan,
        borderBottom: `1px solid ${COLORS.blue}`,
        overflow: "hidden",
    },
};

export default React.createClass({
    render() {
        return (
            <div style={STYLES.subheader}>{this.props.content}</div>
        )
    }
});
