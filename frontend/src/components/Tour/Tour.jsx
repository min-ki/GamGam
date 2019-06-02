import React from "react";

class Tour extends React.Component {
  state = {
    tourList: []
  };

  componentDidMount() {
    fetch("http://hanur.me/users")
      .then(res => res.json())
      .then(data => data.filter(item => item.isRequired));
  }

  render() {
    return <div />;
  }
}
