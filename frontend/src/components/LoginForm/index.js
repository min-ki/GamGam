import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        usernameLogin: (email, password) => {
            dispatch(userActions.usernameLogin(email, password));
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);