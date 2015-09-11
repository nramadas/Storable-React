import React            from "react";
import {COLORS, MIXINS} from "./styles";

export default React.createClass({
    getInitialState() {
        const styles = {
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
            }
        };

        return {styles};
    },

    render() {
        return (
            <div style={this.state.styles.tab} onClick={this.props.onClick}>{this.props.content}</div>
        )
    }
});
