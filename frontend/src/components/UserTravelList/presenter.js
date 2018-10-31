import React from "react";
import Loading from "components/Loading";
import styles from "./styles.scss";
import { Link } from "react-router-dom";

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
    {props.user_plan.map(plan => (
      <RenderUserTravelList {...plan} key={plan.id} />
    ))}
  </div>
);

const RenderUserTravelList = props => {
  return (
    <div className="UserTravelList-wrapper">
      <Link to={`/travel/${props.id}`}>
        <div className="UserTravelList-content">
          <img
            src={props.main_image}
            alt="이미지를 넣어주세요"
            width="150"
            height="150"
          />
          {props.title}
          {props.price}
        </div>
      </Link>
    </div>
  );
};

export default UserTravelList;
