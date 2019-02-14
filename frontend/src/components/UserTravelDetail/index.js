import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as travelActions } from "redux/modules/travel"; 

const mapStateToProps = (state, ownProps) => {
  
  const TravelId = ownProps.match.params.id;
  
  const {
    travels: { travel }
  } = state;
  
  return {
    TravelId,
    travel
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getTravelDetail: () => {
            dispatch(travelActions.getTravelDetail(ownProps.match.params.id));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
