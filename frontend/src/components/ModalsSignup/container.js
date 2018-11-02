import React, { Component } from 'react';
import ModalsSignup from "./presenter";

class Container extends Component {
    state = {
        action: "signup"
    };
    render() {
        const { action } = this.state;
        return <ModalsSignup action={action} changeAction={this._changeAction} />
    }

    _changeAction = () => {
        this.setState(prevState => {
            const { action } = prevState;
            if(action === "login"){
                return {
                    action: "signup"
                }
            } else if(action === "signup") {
                return {
                    action: "login"
                }
            }
        })
    }
}

export default Container;