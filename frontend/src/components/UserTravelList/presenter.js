import React from "react";
import Loading from "components/Loading";
import styles from "./styles.scss";
import { Link } from "react-router-dom";
import { ButtonToolbar } from "reactstrap";

const UserTravelList = props => {
  if (props.loading) {
    return <Loading />;
  } else if (props.user_plan) {
    return <MapToUserTravelList {...props} />;
  }
};

const MapToUserTravelList = props => (
  <div className="UserTravelList-container">
    <div className="plan-description">여행을 시작하세요.</div>
    <div className="plan-windows">{props.user_plan.map(plan => <RenderUserTravelList {...plan} key={plan.id} />)}</div>
  </div>
);

const RenderUserTravelList = props => {
  return (
    <div className="UserTravelList-wrapper">
        <div className="UserTravelList-content">
          <img className="UserTravelList-image" src={props.main_image ? props.main_image : require("images/2-(150x150).jpg")} alt="temp" width="320" height="310"/>
          <div className="UserTravelList-content__right">
            <div className="UserTravelList-title-day">
                <h1 className="UserTravelList-title">제목 : {props.title} </h1> 
                <h1 className="UserTravelList-day"> {props.start_at} ~ {props.end_at}</h1>
            </div>
                <h1 className="UserTravelList-cost">비용 : {props.price} 원 </h1>
                <h1 className="UserTravelList-region">지역 : {props.travel_region} </h1>
                <Link to={`/travel/${props.id}`}>
                <ButtonToolbar className="UserTravelList-button">수정</ButtonToolbar>
                </Link>
          </div>
        </div>
    </div>
  );
};

export default UserTravelList;
