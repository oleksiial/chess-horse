import App from './components/App';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

const initialState = window.REDUX_INITIAL_STATE || {};

const store = configureStore(initialState);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	, document.getElementById('root')
);
