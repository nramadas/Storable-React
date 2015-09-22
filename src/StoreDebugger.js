import React                    from "react";
import loadWebFonts             from "./internals/loadWebFonts";
import {COLORS, MIXINS}         from "./internals/styles";
import StoreDebuggerHeader      from "./internals/StoreDebuggerHeader";
import StoreDebuggerSubHeader   from "./internals/StoreDebuggerSubHeader";
import StoreDebuggerControls    from "./internals/StoreDebuggerControls";
import StoreDebuggerState       from "./internals/StoreDebuggerState";
import StoreDebuggerPulltag     from "./internals/StoreDebuggerPulltag";

const STYLES = {
    container: {
        ...MIXINS.absolutePick(0, null, 0, 0),
        ...MIXINS.transition({width: "0.2s"}),
        width: "0",
        maxWidth: "400px",
        position: "fixed",
        backgroundColor: COLORS.darkblue,
        fontFamily: "'Open Sans'",
    },

    controls: {
        overflowX: "hidden",
    },

    states: {
        ...MIXINS.absolutePick("70px", 0, 0, 0),
        overflowX: "hidden",
        overflowY: "scroll",
    },

    tab: {
        ...MIXINS.absolutePick(null, null, "10px", "100%"),
        marginLeft: "-1px",
        width: "60px",
        height: "30px",
    },
};

export default React.createClass({
    className: "StoreDebugger",

    componentWillMount() {
        loadWebFonts();
    },

    componentDidMount() {
        this.props.manager.updates.forEach(({transactions, currentLedgerIndex, isTimeTravelling}) => {
            this.setState({
                ...this.state,
                transactions,
                currentLedgerIndex,
                backEnabled: currentLedgerIndex > 0,
                pauseEnabled: !isTimeTravelling && transactions.length > 0,
                commitEnabled: isTimeTravelling && transactions.length > 0,
                forwardEnabled: currentLedgerIndex < transactions.length -1,
            });
        });
    },

    getInitialState() {
        return {
            isOpen: false,
            transactions: [],
            currentLedgerIndex: -1,
            backEnabled: false,
            pauseEnabled: false,
            commitEnabled: false,
            forwardEnabled: false,
        };
    },

    togglePanel() {
        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen,
        })
    },

    handleControlClick(buttonTitle) {
        if (buttonTitle === "PREV") {
            this.props.manager.rewind(1);
        } else if (buttonTitle === "NEXT") {
            this.props.manager.fastForward(1);
        } else if (buttonTitle === "PAUSE") {
            this.props.manager.pause();
        } else if (buttonTitle === "RESUME") {
            this.props.manager.resume();
        } else if (buttonTitle === "COMMIT") {
            this.props.manager.commit();
        }
    },

    render() {
        const {
            isOpen,
            backEnabled,
            pauseEnabled,
            showPaused,
            forwardEnabled,
            commitEnabled,
            transactions,
            currentLedgerIndex,
        } = this.state;

        const containerStyle = {
            ...STYLES.container,
            width: isOpen ? "20%" : "0",
            minWidth: isOpen ? "200px" : null,
        }

        return (
            <div style={containerStyle}>
                <StoreDebuggerHeader content={"Storable"} />
                <div style={STYLES.controls}>
                    <StoreDebuggerControls
                        backEnabled={backEnabled}
                        pauseEnabled={pauseEnabled}
                        showPaused={transactions && transactions.length > 0}
                        forwardEnabled={forwardEnabled}
                        commitEnabled={commitEnabled}
                        onClick={this.handleControlClick}
                    />
                </div>
                <div style={STYLES.states}>{
                    this.state.transactions.map((transaction, index) => {
                        return <StoreDebuggerState
                            delta={transaction.delta}
                            state={transaction.state}
                            isCurrent={index === currentLedgerIndex}
                            isValid={index <= currentLedgerIndex}
                            index={index}
                            onClick={this.props.manager.goto}
                            key={"debugState" + index}
                        />;
                    })
                }</div>
                <div style={STYLES.tab}>
                    <StoreDebuggerPulltag content={"Debug"}
                                          onClick={this.togglePanel} />
                </div>
            </div>
        )
    },
});
