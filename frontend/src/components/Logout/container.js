import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logout from './presenter';

class Container extends Component {

    static propTypes = {
        userLogout: PropTypes.func.isRequire
    };

    componentWillMount() {
        const { userLogout } = this.props;

        userLogout();
    }

    render() {
        return (
            <Logout />
        );
    }
}

export default Container;