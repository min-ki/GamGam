import { connect } from "react-redux";
import Container from "./container";

const mapStateProps = (state, ownProps) => {
  const { user, routing: { location } } = state; // state에서 user와 routing만 뽑아서 할당한다.

  return {
    isLoggedIn: user.isLoggedIn, // 사용자가 로그인 되어있는지 체크
    pathname: location.pathname
  }
}

export default connect(mapStateProps)(Container)