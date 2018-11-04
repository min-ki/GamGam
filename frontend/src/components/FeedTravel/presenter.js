import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import { Link } from 'react-router-dom';
import TravelActions from "components/TravelActions";

const FeedTravel = (props, context) => {
    return (
        <div className="feed-photo">
                <div className="feed-wrapper">
                    <h1 className="feed-header">
                        {props.title}
                        <div className="feed-like_button">
                            <TravelActions 
                                number={props.like_count} 
                                isLiked={props.is_liked} 
                                travelId={props.id}
                                key={props.id}
                            />
                        </div>
                    </h1>
                <Link to={`/feed/${props.id}`} className={styles.detailLink}>
                    <div className="feed-body">
                        <FeedImage className="feed-image" img={props.main_image} />
                        <FeedContent className="feed-content" {...props} />
                    </div>
                </Link>
            </div>
        </div>
    )
};

const FeedImage = (props) => (
    <img className={styles.feedImage} src={props.img ? props.img : require("images/logo.png")} alt="temp" />
);

const FeedContent = (props) => (
    <div className="feed-content">
        <div className="feed-content__header">
            <p className="feed-content-attraction">{props.travel_region}</p>
            <p className="feed-content-duration">{props.start_at} - {props.end_at} </p>
        </div>
    
      <p className="feed-content-travel_region__header">다녀온 곳</p>
      <div className="feed-content-travel_region">{props.travel_plan.map((plan, idx) => <TravelPlanRegion travel_region={plan.travel_region} key={idx} />)}</div>
      <div className="feed-content-bottom">  
        <h1 className="feed-content-username">여행자 : {props.owner.username}</h1>  
        <div className="feed-content-tags">
          {props.tags.map((tag, index) => (<span className="tag" key={index}>{`#${tag}`}{" "}</span>))}
        </div>
      </div>
    </div>
);

const TravelPlanRegion = (props) => (
    <h1 className="TravelPlanRegion-travel_region">- {props.travel_region}</h1>
)

FeedTravel.contextTypes = {
    t: PropTypes.func.isRequired
};

FeedTravel.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    like_count: PropTypes.number.isRequired,
    is_liked: PropTypes.bool.isRequired,
};

export default FeedTravel;