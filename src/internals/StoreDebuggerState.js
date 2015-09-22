import React                        from "react";
import {COLORS, MIXINS}             from "./styles";
import StoreDebuggerObjectViewer    from "./StoreDebuggerObjectViewer"

const STYLES = {
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

    stateViewer: {
        marginTop: "15px",
        overflow: "hidden",
    },

    tab: {
        ...MIXINS.absolutePick(null, 0, 0, null),
        display: "none",
        height: "10px",
        width: "20px",
        backgroundColor: COLORS.blue,
    },
};


export default React.createClass({
    getInitialState() {
        return {isHovered: false};
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
        const msg = JSON.stringify(this.props.delta);
        let containerColor = null;
        let descColor = this.props.isValid ? COLORS.white : COLORS.blue;

        if (this.state.isHovered) {
            containerColor = COLORS.blue;
            descColor = this.props.isValid ? COLORS.white : COLORS.sand;
        }

        const containerStyle = {...STYLES.stateTemplate, backgroundColor: containerColor};
        const descStyle = {...STYLES.stateDesc, color: descColor};
        const tabStyle = {...STYLES.tab, display: this.props.isCurrent ? "block" : "none"}

        return (
            <div style={containerStyle}
                 onClick={this.onClick}
                 onMouseEnter={this.onMouseEnter}
                 onMouseLeave={this.onMouseLeave}>
                <div style={descStyle}>{msg}</div>
                {this.props.isValid ?
                    <div style={STYLES.stateViewer}>
                        <StoreDebuggerObjectViewer displayName={"state"}
                                                displayItem={this.props.state}/>
                    </div> : null
                }
                <div style={tabStyle}></div>
            </div>
        );
    }
});
