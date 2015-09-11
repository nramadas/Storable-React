import React            from "react";
import map              from "lodash/collection/map";
import {COLORS, MIXINS} from "./styles";

export default React.createClass({
    getInitialState() {
        const buttonHeight = "19px";
        const halfHeight = "9px";

        const styles = {
            button: {
                display: "inline-block",
                verticalAlign: "top",
                height: buttonHeight,
                width: "25%",
                cursor: "pointer",
            },

            line: {
                display: "inline-block",
                verticalAlign: "top",
                height: halfHeight,
                width: "10%",
                borderBottom: `1px solid ${COLORS.cyan}`,
            },

            buttonTitle: {
                ...MIXINS.borderbox(),
                display: "inline-block",
                verticalAlign: "top",
                height: buttonHeight,
                lineHeight: "17px",
                fontSize: "12px",
                width: "80%",
                color: COLORS.cyan,
                textAlign: "center",
                border: `1px solid ${COLORS.cyan}`,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
            },
        };

        return {styles};
    },

    renderButton(buttonTitle, enabled) {
        const {styles} = this.state;
        const buttonTitleStyle = {
            ...styles.buttonTitle,
            color: enabled ? COLORS.cyan : COLORS.blue,
            borderColor: enabled ? COLORS.cyan : COLORS.blue,
        };

        return (
            <div style={styles.button} onClick={() => enabled && this.props.onClick(buttonTitle)}>
                <div style={styles.line}></div>
                <div style={buttonTitleStyle}>{buttonTitle}</div>
                <div style={styles.line}></div>
            </div>
        )
    },

    render() {
        const buttons = [
            ["PREV", this.props.backEnabled],
            [this.props.pauseEnabled ? "PAUSE" : "RESUME", this.props.showPaused],
            ["COMMIT", this.props.commitEnabled],
            ["NEXT", this.props.forwardEnabled],
        ]

        return (
            <div>{map(buttons, ([buttonTitle, enabled]) => this.renderButton(buttonTitle, enabled))}</div>
        )
    }
})
