const createSlice = require('@reduxjs/toolkit').createSlice;
const cakeActions = require('../cake/cakeSlice').cakeActions;

const initialState = {
    numOfIceCreams:20,
};

const iceCreamSlice = createSlice({
    name:'iceCream',
    initialState,
    reducers:{
        ordered:(state) =>{
            state.numOfIceCreams--;
        },
        restocked:(state,action) =>{
            state.numOfIceCreams+=action.payload;
        },
    },
    //builder.addCase(...)
    // This is the syntax to handle a specific external action
    // builder.addCase(actionCreator/actionType, reducerFunction)
    extraReducers:(builder) =>{
        builder.addCase(cakeActions.ordered,(state) =>{
            state.numOfIceCreams--;
        })
    },    
});

module.exports = iceCreamSlice.reducer;
module.exports.iceCreamActions = iceCreamSlice.actions;