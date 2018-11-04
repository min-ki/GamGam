import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";
import { Button, Icon, Label } from 'semantic-ui-react'

 const TravelActions = (props, context) => (
  <div className={styles.actions}>
    <Button as='div' labelPosition='right' onClick={props.handleHeartClick}>
      <Button color={props.isLiked ? "red" : "grey" }>
          <Icon name='heart'/>
          가고싶어요
      </Button>
      <Label as='a' basic color={props.isLiked ? "red" : "grey" } pointing='left'>
          {props.number}
      </Label>
    </Button>
  </div>
);

 TravelActions.propTypes = {
  number: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  travelId: PropTypes.number.isRequired,
  handleHeartClick: PropTypes.func.isRequired,
};

 TravelActions.contextTypes = {
  t: PropTypes.func.isRequired
};
 export default TravelActions;