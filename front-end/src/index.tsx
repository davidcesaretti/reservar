import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom'
import store from "./store/store";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./config-theme";
import { ProvideAuth } from "./firebase/index";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ProvideAuth>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </ProvideAuth>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
