import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as travelActions } from "redux/modules/travel";

const mapStateToProps = (state, ownProps) => {
  const {
    travels: { feed }
  } = state;
  return {
    feed
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getFeed: () => {
      dispatch(travelActions.getFeed());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
