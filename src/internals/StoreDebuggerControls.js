import React            from "react";
import {COLORS, MIXINS} from "./styles";

const BUTTON_HEIGHT = "19px";
const HALF_HEIGHT = "9px";

const STYLES = {
    button: {
        ...MIXINS.userSelect("none"),
        display: "inline-block",
        verticalAlign: "top",
        height: BUTTON_HEIGHT,
        width: "25%",
        cursor: "pointer",
    },

    line: {
        display: "inline-block",
        verticalAlign: "top",
        height: HALF_HEIGHT,
        width: "10%",
        borderBottom: `1px solid ${COLORS.cyan}`,
    },

    buttonTitle: {
        ...MIXINS.borderbox(),
        display: "inline-block",
        verticalAlign: "top",
        height: BUTTON_HEIGHT,
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

export default React.createClass({
    renderButton(buttonTitle, enabled) {
        const buttonTitleStyle = {
            ...STYLES.buttonTitle,
            color: enabled ? COLORS.cyan : COLORS.blue,
            borderColor: enabled ? COLORS.cyan : COLORS.blue,
        };

        return (
            <div style={STYLES.button} onClick={() => enabled && this.props.onClick(buttonTitle)}>
                <div style={STYLES.line}></div>
                <div style={buttonTitleStyle}>{buttonTitle}</div>
                <div style={STYLES.line}></div>
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
            <div>{buttons.map(([buttonTitle, enabled]) => this.renderButton(buttonTitle, enabled))}</div>
        )
    }
})
