// store.js
import { createStore } from "redux";
import { Provider } from "react-redux";
import expenseReducer from "./reducer/reducers";

const store = createStore(expenseReducer);

export default store;
