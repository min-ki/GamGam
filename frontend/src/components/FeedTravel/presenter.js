import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Ionicon from 'react-ionicons';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';

const FeedTravel = (props, context) => {
    return (
            <Col lg="3" md="4" sm="6" xs="12"> 
                <div className={styles.feedPhoto}>
                    <Link to={`/feed/${props.id}`} className={styles.detailLink}>
                        <header className={styles.header}>
                            <FeedImage img={props.main_image} />
                            <span className={styles.travelMeta}>
                                <Ionicon icon = "md-heart"fontSize = "24px" color = "red" />
                            </span>
                            <span className={styles.travelMeta}> 
                                <h1 className={styles.title}>{props.title}</h1>
                            </span>
                            <span className={styles.travelMeta}>아이디 : {props.owner.username}</span>
                            <span className={styles.travelMeta}>여행 상태 : {props.status}</span>
                            <span className={styles.travelMeta}>
                                {props.tags.map((tag, index) => (<span className={styles.tag} key={index}>{`#${tag}`}{" "}</span>))}
                            </span>
                        </header>
                    </Link>
                </div>
            </Col>
    )
};

const FeedImage = (props) => (
    <img className={styles.feedImage} src={props.img ? props.img : require("images/logo.png")} alt="temp" />
)

FeedTravel.contextTypes = {
    t: PropTypes.func.isRequired
};

FeedTravel.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
};

export default FeedTravel;