import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as travelActions } from "redux/modules/travel";

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        handleHeartClick: () => {
            if (ownProps.isLiked) {
                dispatch(travelActions.unlikeTravel(ownProps.travelId));
            } else {
                dispatch(travelActions.likeTravel(ownProps.travelId));
            }
        }
    };
};

export default connect(null, mapDispatchToProps)(Container);