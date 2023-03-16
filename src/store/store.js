import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';
import rootReducer from './rootReducer';

const middlewares = applyMiddleware(thunk);

export const store = createStore(rootReducer, middlewares);
export const persistor = persistStore(store);
