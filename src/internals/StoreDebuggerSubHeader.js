import React            from "react";
import {COLORS, MIXINS} from "./styles";

export default React.createClass({
    getInitialState() {
        const styles = {
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

        return {styles};
    },

    render() {
        return (
            <div style={this.state.styles.subheader}>{this.props.content}</div>
        )
    }
});
