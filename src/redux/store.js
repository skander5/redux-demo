import {createStore} from "redux";
import cakeReducer from "./cakes/reducer";


const store = createStore(cakeReducer)

export default store