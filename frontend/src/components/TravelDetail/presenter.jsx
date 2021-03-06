import React, { Component } from "react";
import PropTypes from "prop-types";
import ImageGallery from "react-image-gallery";
import styles from "./styles.scss";
import Loading from "components/Loading";

const TravelDetail = props => {
  if (props.loading) {
    return <LoadingFeed />;
  } else if (!props.loading) {
    return (
      <div>
        <div className="gallery-wrapper">
          <MyComponent {...props} />{" "}
        </div>{" "}
      </div>
    );
  }
};

TravelDetail.propsTypes = {
  loading: PropTypes.bool.isRequired
};

const LoadingFeed = props => (
  <div>
    {" "}
    <Loading />{" "}
  </div>
);

class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      image_index: 0,
      showIndex: false,
      showBullets: true,
      showThumbnails: true,
      infinite: true,
      showFullscreenButton: false,
      showGalleryFullscreenButton: false,
      showPlayButton: false,
      showGalleryPlayButton: false,
      showNav: true,
      isRTL: false,
      slideDuration: 450,
      slideInterval: 2000,
      thumbnailPosition: "bottom",
      showVideo: {},
      gallery_image:
        JSON.parse(localStorage.getItem("gallery_img")) || undefined,
      description: undefined
    };
  }

  _onScreenChange(fullScreenElement) {
    console.debug("isFullScreen?", !!fullScreenElement);
  }

  _onImageClick(event) {
    console.debug(
      "clicked on image",
      event.target,
      "at index",
      this._imageGallery.getCurrentIndex()
    );
  }

  _onSlide(index) {
    console.debug("slid to index", index);
    console.log(index);
    this.setState({
      image_index: index
    });
  }

  componentDidUpdate() {
    const {
      travel: { main_image, travel_plan, owner, travel_region, title }
    } = this.props;

    let result_img, result_info, merge_result_info;
    if (travel_plan) {
      result_img = travel_plan.map(plan =>
        plan.plan_images.map(imgs => ({
          src: imgs.file,
          label: imgs.location,
          description: imgs.caption
        }))
      ); // 세부 계획 이미지들만 뽑아내기
    }

    if (travel_plan) {
      result_info = travel_plan.map(plan => ({
        title: plan.title,
        owner: owner.username
      })); // 세부 계획 정보만 뽑아내기
    }

    // 메인이미지 + 세부계획 이미지 리스트

    let merge_result_img = [].concat.apply([], result_img); // 세부계획이미지 1차원 배열로 만들기
    merge_result_img = [
      {
        src: main_image,
        label: travel_region,
        description: title
      },
      ...merge_result_img
    ]; // 메인이미지 + 세부계획 이미지

    const g_image = merge_result_img.map(img => ({
      original: img.src,
      thumbnail: img.src,
      thumbnailLabel: img.label,
      description: img.description
    }));

    if (result_info) {
      merge_result_info = [].concat.apply([], result_info);
    }

    if (merge_result_info) {
      merge_result_info = [
        {
          title: "메인 이미지",
          owner: owner.username
        },
        ...merge_result_info
      ];
    }

    if (!this.state.gallery_image) {
      this.setState({
        gallery_image: g_image,
        description: merge_result_info
      });
      localStorage.setItem("gallery_img", JSON.stringify(g_image));
    }
  }

  render() {
    const {
      travel: { travel_plan, travel_region, title, start_at, end_at },
      items
    } = this.props;

    console.log("presenter props: ", this.props);
    return (
      <div>
        <div className="gallery">
          <div className="gallery-image-title-wrapper">
            <h1 className="gallery-image-title_content gallery-image-title_header">
              {" "}
              {title}{" "}
            </h1>{" "}
            <h1 className="gallery-image-title_content gallery-image-title_region">
              {" "}
              {travel_region}{" "}
            </h1>{" "}
            <h1 className="gallery-image-title_content gallery-image-title_date">
              {" "}
              {start_at}~{end_at}{" "}
            </h1>{" "}
          </div>{" "}
          <ImageGallery
            ref={i => (this._imageGallery = i)}
            items={this.state.gallery_image}
            onClick={this._onImageClick.bind(this)}
            onScreenChange={this._onScreenChange.bind(this)}
            onSlide={this._onSlide.bind(this)}
            showFullscreenButton={false}
          />{" "}
        </div>
        <div>
          {" "}
          {travel_plan ? (
            <RenderTravelPlanList travel_plan={travel_plan} />
          ) : null}{" "}
        </div>{" "}
        <h1 className="tour-title"> 주변 볼거리 </h1>{" "}
        <div className="tour-container">
          {items
            ? items.item
                .filter(info => info.firstimage) // 이미지가 없다면 필터링
                .map(info => <TourList {...info} />)
            : null}
        </div>
      </div>
    );
  }
}

const RenderTravelPlanList = props => (
  <div className="TravelPlanList-container">
    <h1 className="TravelPlanList-title"> 세부 여행 </h1>{" "}
    {props.travel_plan.map(plan => (
      <div className="TravelPlanList-wrapper">
        <div className="TravelPlanList-content_left">
          <h1 className="TravelPlanList-content TravelPlanList-content__title">
            {" "}
            {plan.title}{" "}
          </h1>{" "}
          <h1 className="TravelPlanList-content TravelPlanList-content__content">
            {" "}
            {plan.content}{" "}
          </h1>{" "}
          <h1 className="TravelPlanList-content TravelPlanList-content__price">
            {" "}
            비용: {plan.price}원{" "}
          </h1>{" "}
          <h1 className="TravelPlanList-content TravelPlanList-content__price">
            교통수단 : {plan.Transportation}
          </h1>
          <h1 className="TravelPlanList-content TravelPlanList-content__date">
            {" "}
            일자: {plan.travel_day}{" "}
          </h1>{" "}
        </div>{" "}
        <div className="TravelPlanList-content_right">
          <img
            src={
              plan.plan_images[0]
                ? plan.plan_images[0].file
                : require("images/2-(400x400).jpg")
            }
            alt="temp"
            width="400"
            height="398"
          />
        </div>{" "}
      </div>
    ))}{" "}
  </div>
);

const TourList = props => (
  <div className="tour-item">
    <h1 className="tour-item__title">제목 : {props.title} </h1>
    <h2 className="tour-item__position">위치 : {props.addr1}</h2>
    <img
      className="tour-item__image"
      width="300"
      height="300"
      src={props.firstimage}
    />
  </div>
);

export default TravelDetail;
