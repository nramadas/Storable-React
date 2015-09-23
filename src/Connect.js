import React from "react";

export default React.createClass({
    componentDidMount() {
        this.observer = this.props.store
            .query(...this.props.keyPaths)
            .forEach((state) => this.setState(state));
    },

    componentWillUnmount() {
        this.observer.dispose();
    },

    getInitialState() {
        return {};
    },

    render() {
        return <div>{
            React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, this.state);
            })
        }</div>
    },
})
