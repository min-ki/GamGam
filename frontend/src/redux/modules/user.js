// imports

// actions
const SAVE_TOKEN = "SAVE_TOKEN";
const LOGOUT = "LOGOUT";
const SET_USER_LIST = "SET_USER_LIST";
// action creatros

function saveToken(token){
    return {
        type: SAVE_TOKEN,
        token
    };
}

function logout() {
    return {
        type: LOGOUT
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
            if(json.token){
                dispatch(saveToken(json.token))
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
            if (json.token) {
                dispatch(saveToken(json.token));
            }
        })
        .catch(err => console.log(err));
    };
}

// initial state
const initialState = {
    isLoggedIn: localStorage.getItem("jwt") ? true : false,
    token: localStorage.getItem("jwt")
}

// reducer
function reducer(state = initialState, action) {
    switch(action.type){
        case SAVE_TOKEN:
            return applySetToken(state, action); // 이전상태와 액션
        case LOGOUT: 
            return applyLogout(state, action);
        case SET_USER_LIST:
            return applySetUserList(state, action);
        default:
            return state;
    }
}
// reducer functions
function applySetToken(state, action){
    const { token } = action;
    localStorage.setItem("jwt", token);
    return {
        ...state,
        isLoggedIn: true,
        token
    };
}

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

// exports 
const actionCreators = {
    usernameLogin,
    createAccount,
    logout,
};

export { actionCreators };
// reducer export
export default reducer;