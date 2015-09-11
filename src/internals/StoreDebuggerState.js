import React            from "react";
import {COLORS, MIXINS} from "./styles";

export default React.createClass({
    getInitialState() {
        const styles = {
            stateTemplate: {
                position: "relative",
                padding: "15px",
                borderBottom: `1px solid ${COLORS.blue}`,
                cursor: "pointer",
            },

            stateDesc: {
                fontSize: "18px",
                lineHeight: "28px",
                color: COLORS.white,
                fontFamily: "'Inconsolata'",
                overflowX: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
            },

            tab: {
                ...MIXINS.absolutePick(null, 0, 0, null),
                display: "none",
                height: "10px",
                width: "20px",
                backgroundColor: COLORS.blue,
            },
        };

        return {styles, isHovered: false};
    },

    onClick() {
        this.props.onClick(this.props.index);
    },

    onMouseEnter() {
        this.setState({...this.state, isHovered: true});
    },

    onMouseLeave() {
        this.setState({...this.state, isHovered: false});
    },

    render() {
        const {styles} = this.state;
        const msg = JSON.stringify(this.props.delta);
        let containerColor = null;
        let descColor = this.props.isValid ? COLORS.white : COLORS.blue;

        if (this.state.isHovered) {
            containerColor = COLORS.blue;
            descColor = this.props.isValid ? COLORS.white : COLORS.sand;
        }

        const containerStyle = {...styles.stateTemplate, backgroundColor: containerColor};
        const descStyle = {...styles.stateDesc, color: descColor};
        const tabStyle = {...styles.tab, display: this.props.isCurrent ? "block" : "none"}

        return (
            <div style={containerStyle}
                 onClick={this.onClick}
                 onMouseEnter={this.onMouseEnter}
                 onMouseLeave={this.onMouseLeave}>
                <div style={descStyle}>{msg}</div>
                <div style={tabStyle}></div>
            </div>
        );
    }
});
