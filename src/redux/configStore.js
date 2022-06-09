import { createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import post from "./modules/post";
import users from "./modules/users"


const middlewares = [thunk];

const rootReducer = combineReducers({ post, users });
const enhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancer);

export default store;


//redux toolkit
// import {configureStore} from "@reduxjs/toolkit";
// import info_Reducer from "./modules/info"

// const store = configureStore({
//     reducer: {
//         info: info_Reducer
//     }});

// export default store;