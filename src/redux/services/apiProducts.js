/* eslint-disable no-useless-catch */
import axios from 'axios';

// Se hace la llamada a la API de productos y después se exportan las funciones correspondientes
const products = axios.create({
	baseURL: 'https://fakestoreapi.com',
	headers: {
		'Content-Type': 'application/json',
	},
});

export const getProducts = async () => {
	try {
		const response = await products.get('/products');
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getProductById = async (id) => {
	try {
		const response = await products.get(`/products/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export default products;
