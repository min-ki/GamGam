import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import { Link } from 'react-router-dom';

const FeedTravel = (props, context) => {
    return (
        <div className="feed-photo">
            <Link to={`/feed/${props.id}`} className={styles.detailLink}>
                <div className="feed-wrapper">
                    <h1 className="feed-header">{props.title}</h1>
                    <div className="feed-body">
                        <FeedImage className="feed-image" img={props.main_image} />
                        <FeedContent className="feed-content" {...props} />
                    </div>
                </div>
            </Link>
        </div>
    )
};

const FeedImage = (props) => (
    <img className={styles.feedImage} src={props.img ? props.img : require("images/logo.png")} alt="temp" />
);

const FeedContent = (props) => (
    <div className="feed-content">
      {/* <h1 className="feed-content-title">{props.title}</h1> */}
      <p className="feed-content-attraction">여행지 : {props.travel_region} </p>
      <p className="feed-content-duration">여행기간 : {props.start_at} - {props.end_at} </p>
      <div className="feed-content-bottom">  
        <h1 className="feed-content-username">여행자 : {props.owner.username}</h1>  
        <div className="feed-content-tags">
          {props.tags.map((tag, index) => (<span className="tag" key={index}>{`#${tag}`}{" "}</span>))}
        </div>
      </div>
    </div>
);

FeedTravel.contextTypes = {
    t: PropTypes.func.isRequired
};

FeedTravel.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
};

export default FeedTravel;