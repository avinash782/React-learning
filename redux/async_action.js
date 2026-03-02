const redux = require('redux')
const thunkMiddleware = require('redux-thunk').thunk
const axios = require('axios')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware

const initialState = {
  loading: false,
  users: [],
  error: ''
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'


const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED
  }
}

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users
  }
}

const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error
  }
}

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest())
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        // response.data is the users
        const users = response.data.map(user => user.id)
        dispatch(fetchUsersSuccess(users))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchUsersFailure(error.message))
      })
  }
}

const reducer = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case FETCH_USERS_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: ''
      }
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload
      }
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => {
  console.log(store.getState())
})
store.dispatch(fetchUsers())

//Middleware is a function that sits between dispatching an action and the reducer, used to intercept, modify, delay, or perform side effects before the action reaches the reducer.
// Middleware acts as a middle layer between action dispatch and reducer execution, where we can run logic like:
// API calls
// Logging
// Authentication
// Error handling

// 🎯 Purpose of Middleware (Why we need it?)
// Redux reducers must be:
// Pure
// Synchronous
// Side-effect free
// So we cannot perform API calls inside reducers.

// Middleware handles side effects like:
// API requests
// Async operations
// Logging
// Authentication
// Delays

//applyMiddleware is a Redux function used to apply one or more middleware to the Redux store, enabling interception of dispatched actions.

// Redux-thunk is a middleware that allows us to write asynchronous logic inside Redux.
// Instead of dispatching plain objects, we dispatch functions.
// Thunk middleware intercepts these functions, executes them, and allows us to perform API calls and then dispatch normal actions based on the response.