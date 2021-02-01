import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import {Provider} from 'react-redux';
import 'leaflet/dist/leaflet.css'
import './index.css';
import App from './App';
import allReducers from './reducers'

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) 

ReactDOM.render(
<Provider store={store}>
<App />
</Provider>,
document.getElementById('root'));