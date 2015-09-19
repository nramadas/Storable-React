import React                    from "react";
import map                      from "lodash/collection/map";
import loadWebFonts             from "./internals/loadWebFonts";
import {COLORS, MIXINS}         from "./internals/styles";
import StoreDebuggerHeader      from "./internals/StoreDebuggerHeader";
import StoreDebuggerSubHeader   from "./internals/StoreDebuggerSubHeader";
import StoreDebuggerControls    from "./internals/StoreDebuggerControls";
import StoreDebuggerState       from "./internals/StoreDebuggerState";
import StoreDebuggerPulltag     from "./internals/StoreDebuggerPulltag";

export default React.createClass({
    className: "StoreDebugger",

    componentWillMount() {
        loadWebFonts();
    },

    componentDidMount() {
        this.props.accountant.stream.forEach(({transactions, currentIndex, locked}) => {
            this.setState({
                ...this.state,
                transactions,
                currentIndex,
                backEnabled: currentIndex > 0,
                pauseEnabled: locked && transactions.length > 0,
                commitEnabled: !locked && transactions.length > 0,
                forwardEnabled: currentIndex < transactions.length -1,
            });
        });
    },

    getInitialState() {
        const styles = {
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

        return {styles, isOpen: false};
    },

    togglePanel() {
        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen,
        })
    },

    handleControlClick(buttonTitle) {
        if (buttonTitle === "PREV") {
            this.props.accountant.rewind(1);
        } else if (buttonTitle === "NEXT") {
            this.props.accountant.fastForward(1);
        } else if (buttonTitle === "PAUSE") {
            this.props.accountant.pause();
        } else if (buttonTitle === "RESUME") {
            this.props.accountant.resume();
        } else if (buttonTitle === "COMMIT") {
            this.props.accountant.commit();
        }
    },

    render() {
        const {
            styles,
            isOpen,
            backEnabled,
            pauseEnabled,
            showPaused,
            forwardEnabled,
            commitEnabled,
            transactions,
            currentIndex,
        } = this.state;

        console.log("TRANSACTIONS:", transactions);

        const containerStyle = {
            ...styles.container,
            width: isOpen ? "20%" : "0",
            minWidth: isOpen ? "200px" : null,
        }

        return (
            <div style={containerStyle}>
                <StoreDebuggerHeader content={"Storable"} />
                <div style={styles.controls}>
                    <StoreDebuggerControls
                        backEnabled={backEnabled}
                        pauseEnabled={pauseEnabled}
                        showPaused={transactions && transactions.length > 0}
                        forwardEnabled={forwardEnabled}
                        commitEnabled={commitEnabled}
                        onClick={this.handleControlClick}
                    />
                </div>
                <div style={styles.states}>{
                    map(this.state.transactions, (transaction, index) => {
                        return <StoreDebuggerState
                            delta={transaction.delta}
                            isCurrent={index === currentIndex}
                            isValid={index <= currentIndex}
                            index={index}
                            onClick={this.props.accountant.goto}
                            key={"debugState" + index}
                        />;
                    })
                }</div>
                <div style={styles.tab}>
                    <StoreDebuggerPulltag content={"Debug"}
                                          onClick={this.togglePanel} />
                </div>
            </div>
        )
    },
});
