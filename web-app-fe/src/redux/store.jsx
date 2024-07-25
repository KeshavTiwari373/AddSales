import { configureStore } from '@reduxjs/toolkit';
import { combineReducer } from "./combineReducer";

const store = configureStore({
    reducer: combineReducer,
  });

export default store;