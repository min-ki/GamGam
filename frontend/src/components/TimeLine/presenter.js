import React, {} from "react";
import { Timeline, Event } from "react-timeline-scribble";
import styles from "./styles.scss";
import Loading from "components/Loading";
import { ButtonToolbar } from "reactstrap";

const TimeLine = props => {
  if (props.loading) {
    return <Loading />;
  } else if (props.feed) {
    return <MapToTimeline {...props} />;
  }
};

const MapToTimeline = props => (
  <div className="timeline">
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
            interval={"2016 – 2018"}
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
            <ButtonToolbar className={styles.button}>수정</ButtonToolbar>
          </Event>
        </Timeline>
      </div>
    </div>
  );
};

// 지도 컴포넌트

export default TimeLine;
