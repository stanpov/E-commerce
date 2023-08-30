import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/index";
import App from "./App";
import { ToastContainer } from "react-toastify";
import './global-styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ToastContainer/>
    </Provider>
  </BrowserRouter>
);
