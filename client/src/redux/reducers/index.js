import { combineReducers } from "redux";

import UserReducer from './userReducer'
import MovieReducer  from "./movieReducer";

const allReducers = combineReducers({
  UserReducer,
  MovieReducer
  // add more reducers here
});

export default allReducers