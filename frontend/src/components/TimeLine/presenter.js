import React, { Component } from "react";
import { Timeline, Event } from "react-timeline-scribble";
import styles from "./styles.scss";
import Loading from "components/Loading";
import ReactModal from "react-modal";

const TimeLine = props => {
  if (props.loading) {
    return <Loading />;
  } else if (props.feed) {
    return <MapToTimeline {...props} />;
  }
};

const MapToTimeline = props => (
  <div className="timeline">
    <div className="timline-description">추억하기</div>
    {props.feed.filter(travel => travel.status === "추억하기").map(travel => (
      <RenderTimeLine {...travel} key={travel.id} />
    ))}
  </div>
);

class RenderTimeLine extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      plan: ""
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
    this.setState({ showModal: false });
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
            </Event>
          </Timeline>
        </div>
        <div className="timeline-content__right">
          <div className="timeline-image-wrapper">
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
                />
              </div>
            ))}

            <ReactModal
              isOpen={this.state.showModal}
              ariaHideApp={false}
              contentLabel="Minimal Modal Example"
            >
              <div>
                {this.state.plan.title}
                {this.state.plan.travel_day}
                {this.state.plan.travel_region}
              </div>

              <button onClick={this.handleCloseModal}>Close Modal</button>
            </ReactModal>
          </div>
        </div>
      </div>
    );
  }
}

export default TimeLine;
