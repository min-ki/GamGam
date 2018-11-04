import React, { Component } from 'react';
import ModalsSignin from "./presenter";

class Container extends Component {
    state = {
        action: "login"
    };
    render() {
        const { action } = this.state;
        return <ModalsSignin action={action} changeAction={this._changeAction} />
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