import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import { DataProvider } from './datacontext/dataContext';
import configurestore from "./app/store";

ReactDOM.render(
 <React.StrictMode>
     <Router>
    <Provider store={configurestore}>
      <DataProvider>
    <App />
    </DataProvider>
    </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
