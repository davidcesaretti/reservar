import React from "react";
import ReactDOM from "react-dom";
import App from "./src/App";
import { Provider } from "react-redux";
import store from "./src/store/store";

// interface AppProps {
//   title: string;
// }

// function App({ title }: AppProps): JSX.Element {
//   //App(props:AppProps)
//   const [counter, setCounter] = useState(0);

//   return (
//     <div>
//       <h3>Henry Workshop - {title}</h3>
//       <hr></hr>
//       <button onClick={() => setCounter(counter + 1)}>Increment</button>
//       <button onClick={() => setCounter(counter - 1)}>Decrement</button>
//       <br></br>
//       <span>{counter}</span>
//     </div>
//   );
// }
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

//ReactDOM.render(<App />, document.querySelector("#root"));
