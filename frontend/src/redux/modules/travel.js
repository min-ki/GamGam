// imports
import { actionCreators as userActions } from "redux/modules/user";

// actions
const SET_FEED = "SET_FEED";
const TRAVEL_DETAIL = "TRAVEL_DETAIL";

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

// initial state
const initialState = {};

// reducer
function reducer(state = initialState, action){
    switch(action.type) {
        case SET_FEED:
            return applySetFeed(state, action);
        case TRAVEL_DETAIL:
            return applyTravelDetail(state, action);
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

// function applyLikePhoto(state, action) {
//     const { photoId } = action;
//     const { feed } = state;
//     const updatedFeed = feed.map(photo => {
//         if(photo.id === photoId) {
//             return {...photo, is_liked: true, like_count: photo.like_count + 1}
//         } 
//         return photo;
//     });
//     return {...state, feed: updatedFeed};
// }


// exports
const actionCreators = {
    getFeed,
    getTravelDetail
};

export { actionCreators };
// default reducer export

export default reducer;