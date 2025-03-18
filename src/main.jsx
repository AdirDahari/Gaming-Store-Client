import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/bigPie.js";
import axios from "axios";
import { getToken } from "./service/storeService.js";

const mode = import.meta.env.VITE_MODE;
const isDemoMode = mode === "demo";
const baseUrl = import.meta.env.BASE_URL;

if (!isDemoMode) {
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
  axios.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={baseUrl}>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
