import React, { Component } from "react";
import { Timeline, Event } from "react-timeline-scribble";
import styles from "./styles.scss";
import Loading from "components/Loading";
import ReactModal from "react-modal";
import { Button } from "reactstrap";

const TimeLine = props => {
  if (props.loading) {
    return <Loading />;
  } else if (props.feed) {
    return <MapToTimeline {...props} />;
  }
};

const MapToTimeline = props => (
  <div className="timeline">
    <div className="timline-description"> 추억하기 </div>{" "}
    {props.feed.filter(travel => travel.status === "추억하기").map(travel => (
      <RenderTimeLine {...travel} key={travel.id} />
    ))}{" "}
  </div>
);

class RenderTimeLine extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      plan: {
        title: undefined,
        content: undefined,
        travel_region: undefined,
        travel_day: undefined,
        price: undefined,
        plan_images: [{}]
      }
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal(plan) {
    console.log(plan);
    this.setState({
      showModal: true,
      plan
    });
  }

  handleCloseModal() {
    this.setState({
      showModal: false
    });
  }

  render() {
    return (
      <div className="timeline-wrapper">
        <div className="timeline-content__left">
          <Timeline>
            <Event
              interval={`${this.props.start_at} ~ ${this.props.end_at}`}
              title={`${this.props.title}`}
              subtitle={`${this.props.tags}`}
            >
              <img
                className="timeline-image"
                src={
                  this.props.main_image
                    ? this.props.main_image
                    : require("images/logo.png")
                }
                alt="temp"
              />
              <br />
            </Event>{" "}
          </Timeline>{" "}
        </div>{" "}
        <div className="timeline-content__right">
          <div className="timeline-image-wrapper">
            {" "}
            {this.props.travel_plan.map(plan => (
              <div>
                <img
                  className="timeline-image-move"
                  src={
                    plan.plan_images[0]
                      ? plan.plan_images[0].file
                      : require("images/2-(150x150).jpg")
                  }
                  alt="temp"
                  width="100"
                  height="100"
                  onClick={() => this.handleOpenModal(plan)}
                />{" "}
              </div>
            ))}
            <ReactModal
              isOpen={this.state.showModal}
              ariaHideApp={false}
              contentLabel="Minimal Modal Example"
              className="Modal"
              overlayclassName="Overlay"
            >
              <div className="Modal-layout">
                <div className="Modal-layout__wrapper">
                  <div className="Modal-header">
                    <img
                      className="Modal-image"
                      src={
                        this.state.plan.plan_images[0]
                          ? this.state.plan.plan_images[0].file
                          : require("images/2-(150x150).jpg")
                      }
                      alt="temp"
                    />
                  </div>
                  <div className="Modal-content">
                    <div className="Modal-context">
                      <h1> 제목: {this.state.plan.title} </h1>{" "}
                      <h1> 날짜: {this.state.plan.travel_day} </h1>{" "}
                      <h1> 장소: {this.state.plan.travel_region} </h1>{" "}
                      <p className="Modal-context__content"> {this.state.plan.content} </p>
                      가격: {this.state.plan.price}{" "}
                    </div>
                  </div>{" "}
                </div>{" "}
                <Button onClick={this.handleCloseModal} className="Modal-Close">
                  {" "}
                  닫기{" "}
                </Button>{" "}
              </div>{" "}
            </ReactModal>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default TimeLine;
