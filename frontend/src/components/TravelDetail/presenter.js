import React, { Component } from "react";
import PropTypes from "prop-types";
import ImageGallery from "react-image-gallery";

const TravelDetail = props => {
  if (props.loading) {
    return <LoadingFeed />;
  } else if (props.travel) {
    return (
      <div>
        <div className="gallery-wrapper">
          <MyComponent {...props} />
        </div>
      </div>
    );
  }
};

TravelDetail.propsTypes = {
  loading: PropTypes.bool.isRequired
};

const LoadingFeed = props => <div>{/* <Loading /> */}</div>;

class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      image_index: 0,
      showIndex: false,
      showBullets: true,
      showThumbnails: true,
      infinite: true,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showPlayButton: true,
      showGalleryPlayButton: true,
      showNav: true,
      isRTL: false,
      slideDuration: 450,
      slideInterval: 2000,
      thumbnailPosition: "bottom",
      showVideo: {},
      gallery_image: JSON.parse(localStorage.getItem('gallery_img'))  || undefined,
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

  
  componentDidMount() {
  }


  componentDidUpdate() {

    const {
      travel: { main_image, travel_plan, owner, travel_region }
    } = this.props;

    let result_img;
    
    if(travel_plan) {
      result_img = travel_plan.map(plan =>
        plan.plan_images.map(imgs => ({
          src: imgs.file,
          label: imgs.location
        }))); // 세부 계획 이미지들만 뽑아내기
      }
      
    console.log(result_img);

    let result_info;
    
    if(travel_plan) {
      result_info = travel_plan.map(plan => ({
        title: plan.title,
        owner: owner.username
      })); // 세부 계획 정보만 뽑아내기
    }

    let merge_result_img = [].concat.apply([], result_img); // 세부계획이미지 1차원 배열로 만들기
    merge_result_img = [{
      src: main_image,
      label: travel_region
    }, ...merge_result_img]; // 메인이미지 + 세부계획 이미지
    
    console.log(merge_result_img);

    const g_image = merge_result_img.map(img => ({
      original: img.src,
      thumbnail: img.src,
      thumbnailLabel: img.label
    }));


    let merge_result_info;
    
    if(result_info){
      merge_result_info = [].concat.apply([], result_info);
    }

    if(merge_result_info) {
      merge_result_info = [
        { title: "메인 이미지", owner: owner.username },
        ...merge_result_info
      ];
    }

    if (!this.state.gallery_image) {
      this.setState({
        gallery_image: g_image,
        description: merge_result_info
      });
      localStorage.setItem('gallery_img', JSON.stringify(g_image));
    }
  }

  render() {
    const {
      travel: { travel_plan, travel_region, title, start_at, end_at }
    } = this.props;

    return (
      <div>
        <div className="gallery">
          <div className="gallery-image-title-wrapper">
            <h1 className="gallery-image-title_content gallery-image-title_header">{title}</h1>
            <h1 className="gallery-image-title_content gallery-image-title_region">{travel_region}</h1>
            <h1 className="gallery-image-title_content gallery-image-title_date">{start_at} ~ {end_at}</h1>
          </div>
          <ImageGallery ref={i => (this._imageGallery = i)} items={this.state.gallery_image} onClick={this._onImageClick.bind(this)} onScreenChange={this._onScreenChange.bind(this)} onSlide={this._onSlide.bind(this)} />
        </div>

        <div>
          {travel_plan ? <RenderTravelPlanList travel_plan={travel_plan} /> : null}
        </div>
      </div>
    );
  }
}

const RenderTravelPlanList = props => (
  <div className="TravelPlanList-container">
    <h1 className="TravelPlanList-title">세부 여행 </h1>
    {props.travel_plan.map(plan => (
      <div className="TravelPlanList-wrapper">
        <div className="TravelPlanList-content_left">
          <h1 className="TravelPlanList-content">제목 : {plan.title}</h1>
          <h1 className="TravelPlanList-content">내용 : {plan.content}</h1>
          <h1 className="TravelPlanList-content">비용 : {plan.price}</h1>
          <h1 className="TravelPlanList-content">일자 : {plan.travel_day}</h1>
        </div>
        <div className="TravelPlanList-content_right">
          <img src={plan.plan_images[0] ? plan.plan_images[0].file : require("images/logo.png")} alt="temp" width="400" height="400"/>
        </div>
      </div>
    ))}
  </div>
);

export default TravelDetail;

// 더미 이미지
// const images = [
//   {
//     original: main_image,
//     thumbnail: main_image,
//     description: "오연서",
//     thumbnailLabel: "오연서",
//   },
//   {
//     original: "https://scontent-icn1-1.cdninstagram.com/vp/69587ba45cd721c12bd729ff4f109a89/5C5348FB/t51.2885-15/e35/43509084_701383216893001_1231900833582563573_n.jpg",
//     thumbnail: "https://scontent-icn1-1.cdninstagram.com/vp/69587ba45cd721c12bd729ff4f109a89/5C5348FB/t51.2885-15/e35/43509084_701383216893001_1231900833582563573_n.jpg",
//     description: "오연서",
//     thumbnailLabel: "오연서",
//   },
//   {
//     original: "https://scontent-icn1-1.cdninstagram.com/vp/1d6c197a2fa646376fe11dae6b0c0689/5C642C83/t51.2885-15/e35/43618513_940426492834963_420419519907431047_n.jpg",
//     thumbnail: "https://scontent-icn1-1.cdninstagram.com/vp/1d6c197a2fa646376fe11dae6b0c0689/5C642C83/t51.2885-15/e35/43618513_940426492834963_420419519907431047_n.jpg",
//     description: "오연서",
//     thumbnailLabel: "오연서",
//   },
//   {
//     original: "https://scontent-icn1-1.cdninstagram.com/vp/87d3c0073cbb55f4ee4646cc7f837583/5C469CCB/t51.2885-15/e35/40373448_298481590936467_16596173841118156_n.jpg",
//     thumbnail: "https://scontent-icn1-1.cdninstagram.com/vp/87d3c0073cbb55f4ee4646cc7f837583/5C469CCB/t51.2885-15/e35/40373448_298481590936467_16596173841118156_n.jpg",
//     description: "오연서",
//     thumbnailLabel: "오연서",
//   },
//   {
//     original: main_image,
//     thumbnail: main_image,
//     description: "오연서",
//     thumbnailLabel: "오연서",
//   },
//   {
//     original: main_image,
//     thumbnail: main_image
//   },
//   {
//     original: main_image,
//     thumbnail: main_image
//   }
// ]
