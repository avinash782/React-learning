const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';


// const initialState = {
//     numOfCakes : 10,
//     numOfIceCreams : 20,
// };

const initialCakeState = {
    numOfCakes : 10,
}

const initialIceCreamState = {
    numOfIceCreams : 20,
}
 
//action is an object with type property & payload
//action creator is a function that returns an action
function orderCake(){
    return {
        type:CAKE_ORDERED,
        payload : 1,
    }
};

function restockCake(qty=1){
    return {
        type:CAKE_RESTOCKED,
        payload : qty,
    }
}

function orderIceCream(){
    return{
        type:ICECREAM_ORDERED,
        payload : 1,
    }
}

function restockIceCream(qty=1){
    return{
        type:ICECREAM_RESTOCKED,
        payload : qty,
    }
}

//Reducer specifies how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.
//Reducer is a pure function that takes the current state and an action as arguments and returns a new state
const cakeReducer = (state=initialCakeState,action) =>{

    switch(action.type){
        case CAKE_ORDERED:
            return{
                ...state,
                numOfCakes :state.numOfCakes - action.payload,
            }
        case CAKE_RESTOCKED:
            return{
                ...state,
                numOfCakes:state.numOfCakes + action.payload,
            }
        default:
            return state;
    }
}


const iceCreamReducer = (state=initialIceCreamState,action) =>{

    switch(action.type){
        case ICECREAM_ORDERED:
            return{
                ...state,
                numOfIceCreams : state.numOfIceCreams - action.payload,
            }
        case ICECREAM_RESTOCKED:
            return{
                ...state,
                numOfIceCreams : state.numOfIceCreams + action.payload,
            }
        default:
            return state;
    }
}

//root reducer is a combination of all the reducers in the application
const rootReducer = combineReducers({
    cake:cakeReducer,
    iceCream:iceCreamReducer,
})

const store = createStore(rootReducer , applyMiddleware(logger));
console.log('Initial State', store.getState());

//Logger middleware is a Redux middleware that logs every dispatched action and the corresponding state changes in the console. It helps developers to understand how the state is changing in response to actions, making it easier to debug and track the flow of data in a Redux application. The logger middleware can be added to the Redux store using the applyMiddleware function from the Redux library.
//It shows what action was dispatched, what the previous state was, and what the next state becomes.

const unsubscribe = store.subscribe(() => {})

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(5));

const action = bindActionCreators({orderCake,restockCake,orderIceCream,restockIceCream},store.dispatch);
action.orderCake();
action.orderCake();
action.orderCake();
action.restockCake(5);
action.orderIceCream();
action.orderIceCream();
action.restockIceCream(10);


unsubscribe();