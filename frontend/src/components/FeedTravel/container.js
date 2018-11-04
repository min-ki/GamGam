import React, { Component } from "react";
import FeedTravel from "./presenter";

class Container extends Component {
  
  render() {
    return (
      <FeedTravel 
        {...this.props} 
        {...this.state} />
    );
  }
}

export default Container;
