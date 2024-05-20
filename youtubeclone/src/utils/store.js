import navSlice from "./navSlice";
import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import chatSlice from "./chatSlice";

const store = configureStore({
  reducer: {
    app: navSlice,
    search: searchSlice,
    chat: chatSlice,
  },
});
export default store;
