'use client';
import { Button } from 'baseui/button';

export default function Home() {
	return (
		<div>
			<Button onClick={() => alert('click')}>Hello</Button>
			<button className='bg-red-500'>holas</button>
			<h1>sss</h1>
			<h2>sss</h2>
		</div>
	);
}
