import React, { Component } from 'react';
import UserTravelList from './presenter';

class Container extends Component {

    state = {
        loading: true,
        user_plan: [],
    };

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.user_plan !== nextState.user_plan) {
            return true;
        }
        if(this.state.loading !== nextState.loading) {
            return true;
        }
    }

    componentDidMount() {
        const {
            userId,
            getUserPlanList,
            user_plan
        } = this.props;
        
        if (!user_plan) {
           getUserPlanList(userId); // Plan List
        } else {
            this.setState({
                loading: false,
                user_plan
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