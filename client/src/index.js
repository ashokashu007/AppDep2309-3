import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import {thunk }from "redux-thunk";

let initialStore = {
  loginDetails: {},
};

let loginReducer = (latestStore = initialStore, dispatchedObj) => {
  console.log("inside loginReducer");

  if (dispatchedObj.type === "login") {
    return { ...latestStore, loginDetails: dispatchedObj.data };
  }

  return latestStore;
};

let tasksReducer = (latestStore = initialStore, dispatchedObj) => {
  console.log("inside tasksReducer");

  if (dispatchedObj.type === "addTask") {
    // return{...latestStore,loginDetails:dispatchedObj.data};
  } else if (dispatchedObj.type === "submitTask") {
    // return{...latestStore,loginDetails:dispatchedObj.data};
  } else if (dispatchedObj.type === "deletTask") {
    // return{...latestStore,loginDetails:dispatchedObj.data};
  }

  return latestStore;
};

let messagesReducer = (latestStore = initialStore, dispatchedObj) => {
  console.log("inside messagesReducer");

  if (dispatchedObj.type === "addMessage") {
    // return{...latestStore,loginDetails:dispatchedObj.data};
  }
  if (dispatchedObj.type === "submitMessage") {
    // return{...latestStore,loginDetails:dispatchedObj.data};
  }
  if (dispatchedObj.type === "deletMessage") {
    // return{...latestStore,loginDetails:dispatchedObj.data};
  }

  return latestStore;
};

let store = createStore(
  combineReducers({ loginReducer, tasksReducer, messagesReducer }),
  applyMiddleware(thunk)
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {" "}
      <App />{" "}
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
