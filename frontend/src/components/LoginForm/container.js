import React, {
  Component
} from "react";
import PropTypes from "prop-types";
import LoginForm from "./presenter.js";

class Container extends Component {
  state = {
    username: "",
    password: "",
    message: ""
  };
  static propTypes = {
    usernameLogin: PropTypes.func.isRequired,
  };

  render() {
    const {
      username,
      password
    } = this.state;
    return <LoginForm
      handleInputChange = {
        this._handleInputChange
      }
      handleSubmit = {
        this._handleSubmit
      }
      usernameValue = {
        username
      }
      passwordValue = {
        password
      }
    />;
  }

  _handleInputChange = event => {
    const {
      target: {
        value,
        name
      }
    } = event;
    this.setState({
      [name]: value
    });
  };
  _handleSubmit = event => {
    const { usernameLogin } = this.props; 
    const { username, password } = this.state;
    event.preventDefault();
    usernameLogin(username, password);
  }
}

export default Container;
