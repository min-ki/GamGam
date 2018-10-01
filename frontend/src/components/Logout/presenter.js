import React from 'react';
import { Redirect } from "react-router-dom";

const Logout = props => {
    return (
        <Redirect to="/" />
    );
}

export default Logout;