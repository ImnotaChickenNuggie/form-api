import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';

// Se configura la persistencia del estado para el carrito
const persistConfig = {
	key: 'cart',
	storage,
	whitelist: ['items'],
};

const rootReducer = combineReducers({
	products: productsReducer,
	cart: persistReducer(persistConfig, cartReducer),
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
			},
		}),
});

export const persistor = persistStore(store);
