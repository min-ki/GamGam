import React from 'react';
import Loading from "components/Loading";
import styles from './styles.scss';
import { ButtonToolbar } from "reactstrap";

const UserTravelList = props => {
    if(props.loading){
        return <Loading />;
    } else if (props.user_plan) {
        return <MapToUserTravelList {...props} />;
        
    }  
};

const MapToUserTravelList = props => (
    <div className="UserTravelList-container">
        <div className="plan-description">여행을 시작하세요.</div>
        <div className="plan-description2">{props.user_plan.map(plan => <RenderUserTravelList {...plan} key={plan.id} />)}</div>
        
    </div>
    
);

const RenderUserTravelList = props => {
    
    return (
        <div className="UserTravelList-wrapper">
            <div className="UserTravelList-content">
                <img className="UserTravelLIST-image" src={props.main_image ? props.main_image : require("images/2-(150x150).jpg")} alt="temp" width="150" height="150"/>
                <div className="UserTravelList-buttonside">
                    <h1 className="UserTravelList-title1">제목 : {props.title}</h1>
                    <h1 className="UserTravelList-title2">비용 : {props.price}</h1>
                    <h1 className="UserTravelList-day">일자 : {props.start_at} ~ {props.end_at}</h1>
                    <ButtonToolbar className="UserTravelList-button">수정</ButtonToolbar>
                </div>
            </div>
        </div>
        
    );
    
}


export default UserTravelList;