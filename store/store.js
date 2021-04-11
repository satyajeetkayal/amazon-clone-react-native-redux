import { createStore } from "redux";

import cartItemReducer from "./reducer";

const store = createStore(cartItemReducer);

export default store;
