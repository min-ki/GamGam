import React from 'react';
import Loading from "components/Loading";

const UserTravelList = props => {
    if(props.loading){
        return <Loading />;
    } else if (props.user_plan) {
        return <MapToUserTravelList {...props} />;
    }  
};

const MapToUserTravelList = props => (
    <div>
        {props.user_plan.map(plan => <RenderUserTravelList {...plan} key={plan.id} />)}
    </div>
);

const RenderUserTravelList = props => {
    
    return (
        <div>
            <img src={props.main_image} width="150" height="150" />
            {props.title}
            {props.price}
        </div>
    );
}
    

export default UserTravelList;