'use client';
import { useEffect } from 'react';
import { Button } from 'baseui/button';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchProducts,
	selectFilteredProducts,
} from '@/redux/slices/productsSlice';

export default function Home() {
	const dispatch = useDispatch();
	const { status } = useSelector((state) => state.products);
	const filteredProducts = useSelector(selectFilteredProducts);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	useEffect(() => {
		if (status === 'succeeded') {
			console.log('Products fetched successfully:', filteredProducts);
		}
	}, [status, filteredProducts]);
	return (
		<div>
			<Button onClick={() => alert('click')}>Hello</Button>
			<button className='bg-red-500'>holas</button>
			<h1>sss</h1>
			<h2>sss</h2>
		</div>
	);
}
