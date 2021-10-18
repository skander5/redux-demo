const redux = require('redux')
const createStore = redux.createStore
const applyMiddelware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const initialSate = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILER = 'FETCH_USERS_FAILER'

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailer = error => {
    return {
        type: FETCH_USERS_FAILER,
        payload: error
    }
}

const reducer = (state = initialSate,action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                users:action.payload,
                loading: false
            }
        case FETCH_USERS_FAILER:
            return {
                users:[],
                loading: false,
                error: action.payload
            }
    }
}

const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data.map(user => user.id);
                dispatch(fetchUsersSuccess(users));
            })
            .catch(error => {
                dispatch(fetchUsersFailer())
            })
    }
}

const store = createStore(reducer,applyMiddelware(thunkMiddleware));
store.subscribe(()=> {console.log(store.getState())})
store.dispatch(fetchUsers())