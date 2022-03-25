import { combineReducers } from "redux";

import UserReducer from './userReducer'

const allReducers = combineReducers({
  UserReducer,
  // add more reducers here
});