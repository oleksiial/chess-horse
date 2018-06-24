import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers/index';
import thunk from 'redux-thunk';

export default function (initialState = {}) {
	const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

	return store;
}