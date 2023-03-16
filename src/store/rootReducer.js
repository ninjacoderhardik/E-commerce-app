import {combineReducers} from 'redux';
import {persistReducer, purgeStoredState} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {device} from './device/device.reducers';
import {auth} from './auth/auth.reducers';
import {cart} from './cart/cart.reducers';
import {product} from './product/product.reducers';

const storage = AsyncStorage;

const persistConfig = {
  key: 'root',
  storage,
};

const deviceConfig = {
  key: 'device',
  storage,
  blacklist: ['isConnected', 'isInternetReachable'],
};

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['user'],
};

const cartConfig = {
  key: 'cart',
  storage,
  whitelist: ['products'],
};

const rootReducer = combineReducers({
  device: persistReducer(deviceConfig, device),
  auth: persistReducer(authConfig, auth),
  cart: persistReducer(cartConfig, cart),
  product,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const purgeStore = () => {
  purgeStoredState(persistConfig);
};

export default persistedReducer;
