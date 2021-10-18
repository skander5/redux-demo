const redux = require('redux')
const createStore =  redux.createStore
const combineReducers = redux.combineReducers
const reduxLogger = require('redux-logger')
const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECERRAM = 'BUY_ICECREAM';


const logger = reduxLogger.createLogger()

 buyCake = () => {
    return {
        type: BUY_CAKE,
        info: 'BUY_CAKE action'
    }
}

 buyIceCream = () => {
    return {
        type: BUY_ICECERRAM,
        info: 'BUY_ICECERRAM action'
    }
}

// (previous_State, action) => newState
const initialState = {
     numOfIceCream : 6,
    numOfCake : 10
}

const initialCakeState = {
    numOfCake : 5
}

const initialIceCreamState = {
    numOfIceCream: 8
}

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE:return {
            ...state,
            numOfCake: state.numOfCake -1
        }

        default: return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICECERRAM:return {
            ...state,
            numOfIceCream: state.numOfIceCream -1
        }

        default: return state
    }
}

const rootReducer = combineReducers({
    cake:cakeReducer,
    iceCream:iceCreamReducer
})

const store = createStore(rootReducer);
console.log('Initial state',store.getState());

const unsubscribe = store.subscribe(() => console.log('Update state',store.getState()));
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
unsubscribe();