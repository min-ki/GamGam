import React from 'react';
import PropTypes from 'prop-types';
import Loading from "components/Loading";
import styles from './styles.scss'

const TravelDetail = props => {
    if(props.loading){
        return <LoadingFeed />;
    } else if(props.travel) {
        return <RenderTravelDetail {...props} />;
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
        <div>
            <h1>1일차 </h1>
            <h1>장소 </h1>
            <h1>
                <img src={props.travel.main_image ? `${props.travel.main_image}` : require("images/logo.png")} alt="main_image" width="150" height="150"/>
                <img src={props.travel.main_image ? `${props.travel.main_image}` : require("images/logo.png")} alt="main_image" width="150" height="150"/>
                <img src={props.travel.main_image ? `${props.travel.main_image}` : require("images/logo.png")} alt="main_image" width="150" height="150"/>
                <img src={props.travel.main_image ? `${props.travel.main_image}` : require("images/logo.png")} alt="main_image" width="150" height="150"/>
            </h1>
        </div>
    </div>
);

export default TravelDetail;