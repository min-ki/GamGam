import React, { Component } from "react";
import PropTypes from "prop-types";
import TimeLine from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };

  static propTypes = {
    getFeed: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { getFeed } = this.props;
    if (!this.props.feed) {
      getFeed();
    } else {
      this.setState({
        loading: false
      });
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.feed) {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    const { feed } = this.props;

    return <TimeLine {...this.state} feed={feed} />;
  }
}

export default Container;
