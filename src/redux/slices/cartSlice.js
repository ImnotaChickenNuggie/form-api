import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const existingItem = state.items.find(
				(item) => item.id === action.payload.id
			);

			if (existingItem) {
				if (existingItem.quantity < 5) {
					existingItem.quantity += 1;
				}
			} else {
				state.items.push({
					...action.payload,
					quantity: 1,
				});
			}
		},
		removeFromCart: (state, action) => {
			const index = state.items.findIndex(
				(item) => item.id === action.payload
			);
			if (index !== -1) {
				if (state.items[index].quantity > 1) {
					state.items[index].quantity -= 1;
				} else {
					state.items.splice(index, 1);
				}
			}
		},
		clearCart: (state) => {
			state.items = [];
		},
	},
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) =>
	state.cart.items.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);
export const selectCartItemsCount = (state) =>
	state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;
