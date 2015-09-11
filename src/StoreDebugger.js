import React                from "react";
import map                  from "lodash/collection/map";
import loadWebFonts         from "./internals/loadWebFonts";
import {COLORS, MIXINS}     from "./internals/styles";
import StoreDebuggerState   from "./internals/StoreDebuggerState"

export default React.createClass({
    componentWillMount() {
        loadWebFonts();
    },

    componentDidMount() {
        this.props.accountant.stream.forEach(({transactions, currentIndex}) => {
            this.setState({...this.state, transactions, currentIndex});
        });
    },

    getInitialState() {
        const styles = {
            container: {
                ...MIXINS.absolutePick(0, "100%", 0, 0),
                ...MIXINS.transition({right: "0.2s"}),
                position: "fixed",
                backgroundColor: COLORS.darkblue,
                fontFamily: "'Open Sans'",
            },

            header: {
                height: "48px",
                textAlign: "center",
                fontSize: "24px",
                lineHeight: "64px",
                fontStyle: "italic",
                color: COLORS.cyan,
                overflow: "hidden",
            },

            subheader: {
                height: "64px",
                textAlign: "center",
                fontSize: "32px",
                lineHeight: "52px",
                color: COLORS.cyan,
                borderBottom: `1px solid ${COLORS.blue}`,
                overflow: "hidden",
            },

            states: {
                overflowX: "hidden",
                overflowY: "scroll",
            },

            tab: {
                ...MIXINS.absolutePick(null, null, "10px", "100%"),
                width: "60px",
                height: "30px",
                marginLeft: "-1px",
                border: `1px solid ${COLORS.darkblue}`,
                color: COLORS.darkblue,
                textAlign: "center",
                fontSize: "14px",
                lineHeight: "30px",
                fontFamily: "'Open Sans'",
                cursor: "pointer",
            },
        };

        return {styles, isOpen: false};
    },

    togglePanel() {
        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen,
        })
    },

    render() {
        const {styles, isOpen} = this.state;
        const containerStyle = {
            ...styles.container,
            right: isOpen ? "80%" : "100%",
        }

        const states = map(this.state.transactions, (transaction, index) => {
            return <StoreDebuggerState delta={transaction.delta}
                                       isCurrent={index === this.state.currentIndex}
                                       isValid={index <= this.state.currentIndex}
                                       index={index}
                                       onClick={this.props.accountant.goto}
                                       key={"debugState" + index} />;
        });

        return (
            <div style={containerStyle}>
                <div style={styles.header}>Storable</div>
                <div style={styles.subheader}>DEV TOOLS</div>
                <div style={styles.states}>{states}</div>
                <div style={styles.tab} onClick={this.togglePanel}>Debug</div>
            </div>
        )
    },
});
