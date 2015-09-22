import React            from "react";
import {COLORS, MIXINS} from "./styles";

const STYLES = {
    tab: {
        width: "60px",
        height: "30px",
        border: `1px solid ${COLORS.darkblue}`,
        color: COLORS.darkblue,
        textAlign: "center",
        fontSize: "14px",
        lineHeight: "30px",
        fontFamily: "'Open Sans'",
        cursor: "pointer",
    },
};

export default React.createClass({
    render() {
        return (
            <div style={STYLES.tab} onClick={this.props.onClick}>{this.props.content}</div>
        )
    }
});
