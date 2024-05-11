import { combineReducers } from "redux";
import { ChangeTempratureType, weatherDataReducer } from "./reducer";

export default combineReducers({
    weatherDataReducer,
    ChangeTempratureType
})