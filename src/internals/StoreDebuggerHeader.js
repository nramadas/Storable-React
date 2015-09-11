import React            from "react";
import {COLORS, MIXINS} from "./styles";

export default React.createClass({
    getInitialState() {
        const styles = {
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

        return {styles};
    },

    render() {
        return (
            <div style={this.state.styles.header}>{this.props.content}</div>
        )
    },
});
