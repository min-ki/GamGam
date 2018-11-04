import React, { Component } from "react";
import TravelActions from "./presenter";

class Container extends Component {
    render() {
        return <TravelActions {...this.props} />;
    }
}

export default Container;