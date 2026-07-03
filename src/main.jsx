import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import App from "./App";
import { store } from "./app/store";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 2000,
            style: {
              background: "#1F1F1F",
              color: "#fff",
              borderRadius: "12px",
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);