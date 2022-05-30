import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux';
import Store from './redux/store';

import { Helmet, HelmetProvider } from 'react-helmet-async';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


