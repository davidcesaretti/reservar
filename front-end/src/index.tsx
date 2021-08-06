import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Media from "./components/MediaQuery/Media";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./config-theme";
import { ProvideAuth } from "./firebase/index";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ProvideAuth>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <div className="media">
              <App />
            </div>
            <div className="noMedia">
              <Media />
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </ProvideAuth>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
