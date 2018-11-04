import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import "./style.scss";

import Navigation from "components/Navigation";
import Auth from "components/Auth";
import Logout from "components/Logout";
import Feed from "components/Feed";
import TravelDetail from 'components/TravelDetail';
import TravelPlan from 'components/TravelPlan';
import UserTravelList from 'components/UserTravelList';
import UserTravelDetail from "components/UserTravelDetail";
import TimeLine from "components/TimeLine";
import Footer from "components/Footer";


const App = props => [
  // Nav,
  props.isLoggedIn ? <Navigation key={1} /> : null,
  props.isLoggedIn ? <PrivateRoute key={2} /> : <PublicRoute key={2} />,
  <Footer key={3} />
];

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

const PrivateRoute = props => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route exact path="/feed" component={Feed} />
    <Route path="/feed/:id/" component={TravelDetail} />
    <Route path="/plan" component={TravelPlan} />
    <Route exact path="/travel" component={UserTravelList} />
    <Route path="/travel/:id" component={UserTravelDetail} />
    <Route path="/timeline" component={TimeLine} />
    <Route path="/memorize" render={() => "memorize"} />
    <Route path="/logout" component={Logout} />
  </Switch>
);

const PublicRoute = props => (
	<Switch>
		{/* 첫 메인 페이지 컴포넌트 제작하기 */}
		<Route path="/" component={Auth} /> 
		<Route path="/login" component={Auth} /> 
	</Switch>	
	
)

export default App;
