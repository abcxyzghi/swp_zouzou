import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Provider } from 'react-redux';
import store from './reduxStore/store';
import { ChakraProvider, theme } from '@chakra-ui/react';
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
