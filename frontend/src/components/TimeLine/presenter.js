import React, { Component } from "react";
import { Timeline, Event } from "react-timeline-scribble";
import styles from "./styles.scss";
import Loading from "components/Loading";
import { ButtonToolbar, Media } from "reactstrap";


const TimeLine = props => {
  if (props.loading) {
    return <Loading />;
  } else if (props.feed) {
    return <MapToTimeline {...props} />;
  }
};

const MapToTimeline = props => (
  <div className="timeline">
    <div className = "timline-description">추억하기</div>
    {props.feed.filter(travel => travel.status === "추억하기").map(travel => (
      <RenderTimeLine {...travel} key={travel.id} />
    ))}
  </div>
);

const RenderTimeLine = props => {
  
  return (
    <div className="timeline-wrapper">
      <div className="timeline-content">
        <Timeline>
          <Event
            interval={`${props.start_at} ~ ${props.end_at}`}
            title={`${props.title}`}
            subtitle={`${props.tags}`}
          >
            <img
              className="timeline-image"
              src={
                props.main_image ? props.main_image : require("images/logo.png")
              }
              alt="temp"
            />
            <br />
            여행경비 : {props.price}
          </Event>
        </Timeline>
      </div>
      <div className = "timeline-image" >
        <div className = "timeline-image-center">
          {props.travel_plan.map(plan => (
            <img className ="timeline-image-move" src={plan.plan_images[0] ? plan.plan_images[0].file : require("images/logo.png")} alt="temp" width="100" height="100"/>
          ))}
            {/*
            <div className ="TimeLineList">
            <h1 className="TimeLineList-content">제목 : {plan.title}</h1>
            <h1 className="TimeLineList-content">일자 : {plan.travel_day}</h1>
            <h1 className="TimeLineList-content">내용 : {plan.content}</h1>
            </div>
            */}
        </div>
      </div>
    </div>
  );
};

// 지도 컴포넌트

export default TimeLine;
