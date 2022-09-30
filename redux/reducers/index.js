import {combineReducers} from "redux";
import user from "./user";

const Reducers = combineReducers({
  //reducer name : userState
  userState: user,
});

export default Reducers;
