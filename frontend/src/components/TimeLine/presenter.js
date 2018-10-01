import React from 'react';
import { Timeline, Event } from "react-timeline-scribble";
import styles from './styles.scss';
import Loading from "components/Loading";

const TimeLine = props => {
    if(props.loading){
        return <Loading />;
    } else if (props.feed) {
        return <MapToTimeline {...props} />;
    }
};

const MapToTimeline = props => (
    <div>
        {props.feed.map(travel => <RenderTimeLine {...travel} key={travel.id} />)}
    </div>
);

const RenderTimeLine = props => (
    <div className={styles.timeLine}>
        <Timeline>
        <Event interval={"2016 – 2018"} title={`${props.title}`} subtitle={"서브타이틀"}>
            <img className={styles.feedImage} src={props.main_image ? props.main_image : require("images/logo.png")} alt="temp" />
            여행 년도만 받아오기
            여행경비 : {props.price}
        </Event>
        </Timeline>
    </div>
);

export default TimeLine;