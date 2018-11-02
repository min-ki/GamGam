import React, { Component } from 'react';
import PropTypes from "prop-types";
import UserTravelDetail from './presenter';

class Container extends Component {
    state = {
        loading: true   
    };

    static propTypes = {
        getTravelDetail: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { TravelId, getTravelDetail } = this.props;
        if(!this.props.travel){
            getTravelDetail(TravelId);
        } else if(!this.props.travel.id !== TravelId) {            
            getTravelDetail(TravelId);
        } else {
            this.setState({
                loading: false,
            });
        }
    }
    
    componentWillReceiveProps = nextProps => {
        if (nextProps.travel) {
            this.setState({
                loading: false,
            });
        }
    }

    render() {
        const { travel } = this.props;
        return <UserTravelDetail {...this.state} travel={travel} />
    }
}

export default Container;