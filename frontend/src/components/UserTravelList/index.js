import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as UserActions } from "redux/modules/user"; 


// users/1/plans/  사용자의 여행계획 리스트 받아오기 

const mapStateToProps = (state, ownProps) => {

    // const userId = state.user.userId;
    
    const { user: { userId, user_plan } } = state;

    return {
        userId,
        user_plan
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUserPlanList: (userId) => {
            dispatch(UserActions.getUserPlanList(userId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);