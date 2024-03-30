import { configureStore } from "@reduxjs/toolkit";
import gitUserReducer from "../features/gitUserSlice"

export const store = configureStore({
  reducer : {
    app : gitUserReducer
  }
})