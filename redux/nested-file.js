const produce = require('immer').produce;
const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    name:'AJ styles',
    address: {
        street:'phenomenal st',
        city:'atlanta',
        state:'georgia',
    }
}

const UPDATE_STREET = 'UPDATE_STREET';

function updateStreet(street){ 
    return {
        type: UPDATE_STREET,
        payload: street,  
    }
}  


//Immer package is used to create the next immutable state by mutating the current state. It is a small package that allows you to work with immutable state in a more convenient way. It is based on the concept of drafts, which are mutable copies of the original state. You can mutate the draft state as much as you want, and when you are done, Immer will produce the next immutable state based on the changes you made to the draft.
// a library 
// - we should never mutate the state & always return a new object that resembles the next state 
// - we done that with both 2 reducers. { ...oldState, changingPropert: newValue} <---new state. 
// (in the new - existing state is copied, only necessary property is updated) 
// - in real world, this will be complex, if it has nested levels. 

// - thus immer library comes to help these nested spreads. 
// - produce () method 
// - parameter 1. state, 2. a function which receives a draft copy of the state. 
// - immer allows us to update this draft state as if state is mutable. 
// - it simplifies handling the immutable data structures. 
// - it may look we are updating state directly, but under the hood it does same as our nested spreads...


const reducer = (state=initialState,action) =>{
    switch(action.type){
        case UPDATE_STREET:
            return produce(state,(draft)=>{
                draft.address.street = action.payload;
            })
        default:
            return state;
    }
}

const store = createStore(reducer);
console.log('Initial State', store.getState());

const unsubscribe = store.subscribe(() => {
    console.log('updated state',store.getState());
})

store.dispatch(updateStreet('styles clash street'));

unsubscribe();