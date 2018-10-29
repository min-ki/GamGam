// imports

// actions
const SAVE_TOKEN = "SAVE_TOKEN";
const LOGOUT = "LOGOUT";
const SET_USER_LIST = "SET_USER_LIST";
const GET_USER_PLAN_LIST = "GET_USER_PLAN_LIST";

// action creatros

function saveUserInfo(token, userId){
    return {
        type: SAVE_TOKEN,
        token,
        userId
    };
}

function logout() {
    return {
        type: LOGOUT
    };
}

function UserPlanList(user_plan) {
    return {
        type: GET_USER_PLAN_LIST,
        user_plan
    };
}

// API actions
function usernameLogin(username, password){
    return function(dispatch){
        fetch('/rest-auth/login/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, // username: username 
                password, // password: password
            })
        })
        .then(response => response.json())
        .then(json => {
            if(json.token && json.user){
                dispatch(saveUserInfo(json.token, json.user.pk))
            }
        })
        .catch(err => console.log(err));
    }
}

function createAccount(username, password, email, name){
    return function (dispatch) {
        fetch('/rest-auth/registration/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password1: password,
                password2: password,
                email,
                name
            })
        })
        .then(response => response.json())
        .then(json => {
            if (json.token && json.user) {
                dispatch(saveUserInfo(json.token, json.user));
            }
        })
        .catch(err => console.log(err));
    };
}

function getUserPlanList(userId) {
    return (dispatch, getState) => {
        const { user : { token } } = getState();

        fetch(`/user/${userId}/plans/`, {
            headers:{
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401) {
                dispatch(logout());
            }
            return response.json();
        })
        .then(json => dispatch(UserPlanList(json)));
    };
}

// initial state
const initialState = {
    isLoggedIn: localStorage.getItem("jwt") ? true : false,
    token: localStorage.getItem("jwt"),
    userId: localStorage.getItem("userId"),
};

// reducer
function reducer(state = initialState, action) {
    switch(action.type){
        case SAVE_TOKEN:
            return applySetToken(state, action); // 이전상태와 액션
        case LOGOUT: 
            return applyLogout(state, action);
        case SET_USER_LIST:
            return applySetUserList(state, action);
        case GET_USER_PLAN_LIST:
            return applyGetUserPlanList(state, action);
        default:
            return state;
    }
};

// reducer functions
function applySetToken(state, action){
    const { token } = action;
    const { userId } = action;

    localStorage.setItem("jwt", token); // 사용자의 JWT 저장
    localStorage.setItem("userId", userId); // 사용자의 ID 저장

    return {
        ...state,
        isLoggedIn: true,
        token,
        userId
    };
};

function applyLogout(state, action){
    localStorage.removeItem("jwt");
    return {
        isLoggedIn: false
    };
}

function applySetUserList(state, action){
    const { userList } = action;
    return {
        ...state,
        userList
    };
}

// 사용자의 여행계획 리스트
function applyGetUserPlanList(state, action){
    const { user_plan } = action;

    return {
        ...state,
        user_plan
    };
}

// exports 
const actionCreators = {
    usernameLogin,
    createAccount,
    logout,
    getUserPlanList
};

export { actionCreators };
// reducer export
export default reducer;