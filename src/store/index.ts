import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducer";

const reduxStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default reduxStore;
