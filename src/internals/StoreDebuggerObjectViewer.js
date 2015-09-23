import React                from "react";
import isArray              from "lodash/lang/isArray";
import isObject             from "lodash/lang/isObject";
import isString             from "lodash/lang/isString";
import isFunction           from "lodash/lang/isFunction";
import {COLORS, MIXINS}     from "./styles";

const TITLE_FONT_SIZE = "14px";
const TITLE_LINE_HEIGHT = "22px";
const TITLE_MARGIN_RIGHT = "10px";

const TITLE_BASE_STYLE = {
    marginRight: TITLE_MARGIN_RIGHT,
    fontSize: TITLE_FONT_SIZE,
    lineHeight: TITLE_LINE_HEIGHT,
    display: "inline-block",
    verticalAlign: "middle",
};

const STYLES = {
    arrow: {
        ...TITLE_BASE_STYLE,
        color: COLORS.green,
        width: "15px",
    },

    displayName: {
        ...TITLE_BASE_STYLE,
        color: COLORS.maize,
    },

    displayType: {
        ...TITLE_BASE_STYLE,
        color: COLORS.orange,
    },

    opener: {
        ...TITLE_BASE_STYLE,
        color: COLORS.green,
    },

    closer: {
        ...TITLE_BASE_STYLE,
        color: COLORS.green,
    },

    keyCount: {
        ...TITLE_BASE_STYLE,
        color: COLORS.sand,
    },

    children: {
        paddingLeft: "10px",
        overflow: "hidden",
        color: COLORS.sand,
    },

    arrayItem: {
        paddingLeft: "25px",
        fontSize: TITLE_FONT_SIZE,
        lineHeight: TITLE_LINE_HEIGHT,
    },

    arrayItemIndex: {
        marginRight: "10px",
        color: COLORS.maize,
    },

    arrayItemValue: {
        color: COLORS.sand,
    },
}

const StoreDebugggerObjectViewer = React.createClass({
    getInitialState() {
        return {
            isOpen: false,
        };
    },

    toggleOpen(event) {
        event.stopPropagation();
        this.setState({isOpen: !this.state.isOpen});
    },

    render() {
        const {displayItem, displayName} = this.props;
        const displayTypeStyle = {...STYLES.displayType};
        let children = null;
        let opener = null;
        let closer = null;
        let keyCount = null;
        let content = null;
        let displayType = null;
        let showArrow = false;

        if (isArray(displayItem)) {
            opener = "[";
            closer = "]";
            keyCount = displayItem.length;
            displayType = "Array";
            showArrow = true;
            children = displayItem.map((value, index) => {
                return (<div style={STYLES.arrayItem} key={displayName+value+index}>
                    <span style={STYLES.arrayItemIndex}>{index + ":"}</span>
                    <span style={STYLES.arrayItemValue}>{value}</span>
                </div>);
            });
        } else if (isFunction(displayItem)) {
            displayType = String(displayItem);
            displayTypeStyle.color = COLORS.sand;
        } else if (isObject(displayItem)) {
            opener = "{";
            closer = "}";
            keyCount = Object.keys(displayItem).length;
            displayType = displayItem.constructor.name;
            showArrow = true;
            children = Object.keys(displayItem).map((key, index) => {
                return <StoreDebugggerObjectViewer displayName={key}
                                                   displayItem={displayItem[key]}
                                                   key={displayName+key+index} />
            });
        } else if (isString(displayItem)) {
            displayType = `\"${displayItem}\"`;
            displayTypeStyle.color = COLORS.sand;
        } else {
            displayType = String(displayItem);
            displayTypeStyle.color = COLORS.sand;
        }

        return (
            <div onClick={this.toggleOpen}>
                {showArrow ?
                    <div style={STYLES.arrow}>{this.state.isOpen ?
                        String.fromCharCode(9660) :
                        String.fromCharCode(9658)}</div> :
                    <div style={STYLES.arrow}></div>}
                <div style={STYLES.displayName}>{displayName + ":"}</div>
                <div style={displayTypeStyle}>{displayType}</div>
                {!this.state.isOpen && opener ? <div style={STYLES.opener}>{opener}</div> : null}
                {showArrow ?
                    this.state.isOpen ?
                        <div style={STYLES.children}>{children}</div> :
                        <div style={STYLES.keyCount}>{keyCount}</div> :
                    null}
                {!this.state.isOpen && closer ? <div style={STYLES.closer}>{closer}</div> : null}
            </div>
        )
    }
});

export default StoreDebugggerObjectViewer;
