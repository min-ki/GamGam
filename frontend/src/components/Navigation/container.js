import React, { Component } from 'react';
import Navigation from './presenter';

class Container extends Component {
    render() {
        return <Navigation {...this.props} />;
    }
}

export default Container;