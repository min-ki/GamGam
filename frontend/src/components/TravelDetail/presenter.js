import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from "components/Loading";
import styles from './styles.scss'
import ImageGallery from 'react-image-gallery';

const TravelDetail = props => {
    if(props.loading){
        return <LoadingFeed />;
    } else if(props.travel) {
        return (
          <div>
              <RenderTravelDetail {...props} />
              <div className="gallery-wrapper">
                <MyComponent {...props} />
              </div>
          </div>
        )
    }
};

TravelDetail.propsTypes = {
    loading: PropTypes.bool.isRequired
};

const LoadingFeed = props => (
    <div>
        <Loading />
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
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showPlayButton: true,
      showGalleryPlayButton: true,
      showNav: true,
      isRTL: false,
      slideDuration: 450,
      slideInterval: 2000,
      thumbnailPosition: 'bottom',
      showVideo: {},
    };
  }

  _onScreenChange(fullScreenElement) {
      console.debug('isFullScreen?', !!fullScreenElement);
  }
  
  _onImageClick(event) {
      console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
  }

  _onSlide(index) {
    console.debug('slid to index', index);
    console.log(index);
    this.setState({
        image_index: index
    });
  }

  render() {
    const { travel, travel : { main_image, travel_plan } } = this.props;
    console.log(this.props);
    const description = [
        "ㅎㅇㅎㅇㅎ",
        "ㅎㅇㅎㅇㅎ",
        "ㅎㅇㅎㅇㅎ"
    ]
    const images = [
      {
        original: main_image,
        thumbnail: main_image,
        description: "오연서",
        thumbnailLabel: "오연서",
      },
      {
        original: "https://scontent-icn1-1.cdninstagram.com/vp/69587ba45cd721c12bd729ff4f109a89/5C5348FB/t51.2885-15/e35/43509084_701383216893001_1231900833582563573_n.jpg",
        thumbnail: "https://scontent-icn1-1.cdninstagram.com/vp/69587ba45cd721c12bd729ff4f109a89/5C5348FB/t51.2885-15/e35/43509084_701383216893001_1231900833582563573_n.jpg",
        description: "오연서",
        thumbnailLabel: "오연서",
      },
      {
        original: "https://scontent-icn1-1.cdninstagram.com/vp/1d6c197a2fa646376fe11dae6b0c0689/5C642C83/t51.2885-15/e35/43618513_940426492834963_420419519907431047_n.jpg",
        thumbnail: "https://scontent-icn1-1.cdninstagram.com/vp/1d6c197a2fa646376fe11dae6b0c0689/5C642C83/t51.2885-15/e35/43618513_940426492834963_420419519907431047_n.jpg",
        description: "오연서",
        thumbnailLabel: "오연서",
      },
      {
        original: "https://scontent-icn1-1.cdninstagram.com/vp/87d3c0073cbb55f4ee4646cc7f837583/5C469CCB/t51.2885-15/e35/40373448_298481590936467_16596173841118156_n.jpg",
        thumbnail: "https://scontent-icn1-1.cdninstagram.com/vp/87d3c0073cbb55f4ee4646cc7f837583/5C469CCB/t51.2885-15/e35/40373448_298481590936467_16596173841118156_n.jpg",
        description: "오연서",
        thumbnailLabel: "오연서",
      },
      {
        original: main_image,
        thumbnail: main_image,
        description: "오연서",
        thumbnailLabel: "오연서",
      },
      {
        original: main_image,
        thumbnail: main_image
      },
      {
        original: main_image,
        thumbnail: main_image
      }
    ]

    return (
      <div className="gallery">
        <ImageGallery 
            ref={i => this._imageGallery = i}
            items={images} 
            onClick={this._onImageClick.bind(this)} 
            onScreenChange={this._onScreenChange.bind(this)}
            onSlide={this._onSlide.bind(this)}
        />
        {
            description[this.state.image_index]
        }
      </div>
    );
  }
 
}

const RenderTravelDetail = props => (
    <div className={styles.detailContainer}>
        <div className={styles.detailCard}>
            <div className="card-top">
                <h1 className={styles.detailImage}>
                    <img src={props.travel.main_image ? `${props.travel.main_image}` : require("images/logo.png")} alt="main_image"/>
                </h1>
                <h1 className={styles.detailTitle}>{props.travel.title}</h1>
            </div>
            <h1 className={styles.detailContent}>{props.travel.content}</h1>
            <h1 className={styles.detailStatus}>{props.travel.status}</h1>
            <h1 className={styles.detailPrice}>여행 비용 : {props.travel.price}</h1>
        </div>
    </div>
);

export default TravelDetail;