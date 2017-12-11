import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { store } from './store.js';
import { BrowserRouter } from 'react-router-dom';
import './css/App.css';

let render = () => ReactDOM.render((
	<BrowserRouter>
		<App />
	</BrowserRouter>), document.getElementById('root'));
store.subscribe(render);
render();
registerServiceWorker();
