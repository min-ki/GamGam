import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Ionicon from 'react-ionicons';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';

const FeedTravel = (props, context) => {
    return (
            // <Col lg="4" md="4" sm="6" xs="12"> 
                <div className="feed-photo">
                    <Link to={`/feed/${props.id}`} className={styles.detailLink}>
                        <div className="feed-wrapper">
                            <FeedImage className="feed-image" img={props.main_image} />
                            <FeedContent className="feed-content" {...props} />
                        </div>
                        {/* <header className={styles.header}> */}
                            {/* <FeedImage img={props.main_image} /> */}
                            {/* <span className={styles.travelMeta}> */}
                                {/* <Ionicon icon = "md-heart"fontSize = "24px" color = "red" /> */}
                            {/* </span> */}
                            {/* <span className={styles.travelMeta}>  */}
                                {/* <h1 className={styles.title}>{props.title}</h1> */}
                            {/* </span> */}
                            {/* <span className={styles.travelMeta}>아이디 : {props.owner.username}</span> */}
                            {/* <span className={styles.travelMeta}>여행 상태 : {props.status}</span> */}
                            {/* <span className={styles.travelMeta}> */}
                                {/* {props.tags.map((tag, index) => (<span className={styles.tag} key={index}>{`#${tag}`}{" "}</span>))} */}
                            {/* </span> */}
                        {/* </header> */}
                    </Link>
                </div>
            // </Col>
    )
};

const FeedImage = (props) => (
    <img className={styles.feedImage} src={props.img ? props.img : require("images/logo.png")} alt="temp" />
);

const FeedContent = (props) => (
    <div className="feed-content">
      <h1 className="feed-content-title">{props.title}</h1>
      <p className="feed-content-attraction">여행지 : 대한민국 </p>
      <p className="feed-content-duration">여행기간 : 2018년 11월 09일 ~ 2018년 11월 12일 </p>
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