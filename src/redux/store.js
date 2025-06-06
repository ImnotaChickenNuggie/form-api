import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import personalDataReducer from './slices/personalDataSlice';
import paymentDataReducer from './slices/paymentDataSlice';

// Configuración de persistencia para el carrito y datos personales
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart', 'personalData', 'paymentData']
};

const rootReducer = combineReducers({
	products: productsReducer,
	cart: cartReducer,
	personalData: personalDataReducer,
	paymentData: paymentDataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
			},
		}),
});

export const persistor = persistStore(store);
