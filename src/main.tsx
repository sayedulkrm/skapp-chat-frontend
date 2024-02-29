import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <HelmetProvider>
                    <div onContextMenu={(e) => e.preventDefault()}>
                        <App />
                    </div>
                </HelmetProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
