import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from "components/Loading";
import FeedTravel from "components/FeedTravel";
import { Container, Row } from 'reactstrap';

const Feed = props => {
    if(props.loading){
        return <LoadingFeed />;
    } else if (props.feed) {
        return <RenderFeed {...props} />;
    }
};

const LoadingFeed = props => (
    <div className={styles.feed}>
        <Loading />
    </div>
);

const RenderFeed = props => (
    <Container fluid={true}>
        <Row>
            {props.feed.map(travel => 
                  <FeedTravel {...travel} key={travel.id} />
            )} 
        </Row>
    </Container>
);

Feed.propTypes = {
    loading: PropTypes.bool.isRequired,
    feed: PropTypes.array
};

export default Feed;