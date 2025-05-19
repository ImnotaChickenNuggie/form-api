import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, getProductById } from '../services/apiProducts';

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async () => {
		const response = await getProducts();
		return response;
	}
);

export const fetchProductById = createAsyncThunk(
	'products/fetchProductById',
	async (id) => {
		const response = await getProductById(id);
		return response;
	}
);

const initialState = {
	items: [],
	selectedProduct: null,
	selectedCategory: 'all',
	status: 'idle',
	error: null,
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		clearSelectedProduct: (state) => {
			state.selectedProduct = null;
		},
		setSelectedCategory: (state, action) => {
			state.selectedCategory = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(fetchProductById.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchProductById.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.selectedProduct = action.payload;
			})
			.addCase(fetchProductById.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { clearSelectedProduct, setSelectedCategory } =
	productsSlice.actions;

// Selector para obtener productos filtrados
export const selectFilteredProducts = (state) => {
	const { items, selectedCategory } = state.products;
	if (selectedCategory === 'all') {
		return items;
	}
	return items.filter((product) => product.category === selectedCategory);
};

export default productsSlice.reducer;
