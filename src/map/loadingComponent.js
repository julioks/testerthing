import React from 'react';
import SVGLeaf from './SVGLeaf';

class LoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isUnmounting: false };
        this.loadingScreenRef = React.createRef();
    }

    componentWillUnmount() {
        this.setState({ isUnmounting: true });
    }

    render() {
        return (
            <div
                className={`loading-screen ${this.state.isUnmounting ? 'unmount' : ''}`}
                ref={this.loadingScreenRef}
            >
                <div>Loading {this.props.text}...</div>
                <SVGLeaf className="falling-leaf leaf-inside" />
            </div>
        );
    }
}

export default LoadingScreen;
