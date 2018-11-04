// imports
import { actionCreators as userActions } from "redux/modules/user";

// actions
const SET_FEED = "SET_FEED";
const TRAVEL_DETAIL = "TRAVEL_DETAIL";
const LIKE_TRAVEL = "LIKE_TRAVEL";
const UNLIKE_TRAVEL = "UNLIKE_TRAVEL";
// action creators
function setFeed(feed){
    return {
        type: SET_FEED,
        feed
    };
}

function TravelDetail(travel){
    return {
        type: TRAVEL_DETAIL,
        travel
    };
}

function doLikeTravel(travelId) {
    return {
        type: LIKE_TRAVEL,
        travelId
    };
}

function doUnlikeTravel(travelId) {
    return {
        type: UNLIKE_TRAVEL,
        travelId
    };
}

// api actions
function getFeed(){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        fetch("/travel/", {
            headers:{
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401) {
                dispatch(userActions.logout());
            }
            return response.json();
        })
        .then(json => dispatch(setFeed(json)));
    };
}

function getTravelDetail(TravelId){
    return (dispatch, getState) => {
        dispatch(TravelDetail(TravelId))
        const { user : { token } } = getState();
        fetch(`/travel/${TravelId}/`, {
            method: "GET",
            headers:{
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401) {
                dispatch(userActions.logout());
            }
            return response.json();
        })
        .then(json => dispatch(TravelDetail(json)));
    };
}

function likeTravel(travelId){
    return (dispatch, getState) => {
        dispatch(doLikeTravel(travelId)) // optimistic update
        const { user: { token }} = getState()
        fetch(`/travel/${travelId}/likes/`, {
            method: "POST",
            headers: {
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401) {
                dispatch(userActions.logout());
            } else if (!response.ok) {
                dispatch(doUnlikeTravel(travelId))
            }
        })
    }
}

function unlikeTravel(travelId){
    return (dispatch, getState) => {
        dispatch(doUnlikeTravel(travelId)) // optimistic update
        const { user: { token }} = getState()
        fetch(`/travel/${travelId}/unlikes/`, {
            method: "DELETE",
            headers: {
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401) {
                dispatch(userActions.logout());
            } else if (!response.ok) {
                dispatch(doUnlikeTravel(travelId))
            }
        })
    }
}

// initial state
const initialState = {};

// reducer
function reducer(state = initialState, action){
    switch(action.type) {
        case SET_FEED:
            return applySetFeed(state, action);
        case TRAVEL_DETAIL:
            return applyTravelDetail(state, action);
        case LIKE_TRAVEL:
            return applyLikeTravel(state, action);
        case UNLIKE_TRAVEL:
            return applyUnlikeTravel(state, action);
        default:
            return state;
    }
}
// reducer functions

function applySetFeed(state, action) {
    const { feed } = action;
    return {
        ...state,
        feed
    };
}

function applyTravelDetail(state, action) {
    const { travel } = action;

    return {
        ...state, 
        travel
    };
}

function applyLikeTravel(state, action) {
    const { travelId } = action;
    const { feed } = state;
    const updatedFeed = feed.map(travel => {
        if(travel.id === travelId) {
            return {...travel, is_liked: true, like_count: travel.like_count + 1}
        } 
        return travel;
    });
    return {...state, feed: updatedFeed};
}

function applyUnlikeTravel(state, action) {
    const { travelId } = action;
    const { feed } = state;
    const updatedFeed = feed.map(travel => {
        if(travel.id === travelId) {
            return {...travel, is_liked: false, like_count: travel.like_count - 1}
        } 
        return travel;
    });
    return {...state, feed: updatedFeed};
}

// exports
const actionCreators = {
    getFeed,
    getTravelDetail,
    likeTravel,
    unlikeTravel
};

export { actionCreators };
// default reducer export

export default reducer;