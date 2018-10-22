import React, { Component } from 'react';
import UserTravelList from './presenter';

class Container extends Component {

    state = {
        loading: true
    };


    componentDidMount() {
        const { userId, getUserPlanList } = this.props;
        
        if (!this.props.user_plan) {
           getUserPlanList(userId); // Plan List
        } else {
            this.setState({
                loading: false
            });
        }
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.user_plan) {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const { user_plan } = this.props;

        return (
            <UserTravelList {...this.state} user_plan={user_plan}/>
        );
    }

}

export default Container;