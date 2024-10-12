import React from 'react';

import { APIData } from '../utils/types';
import { cn } from '../utils/cn';

export const Card: React.FC<{ index: number; data: APIData; isDragging?: boolean }> = ({
	index,
	data,
	isDragging
}) => {
	return (
		<div
			className={cn(
				'h-64 w-44 rounded-xl backdrop-blur-md bg-opacity-55',
				// index >= 3 ? 'col-span-1' : 'col-span-1',
				isDragging ? 'bg-gray-500' : 'bg-gray-800'
			)}>
			<p className='px-2 py-3'>{data.title}</p>
			<img src={data.image} className='max-h-52 h-full w-full rounded-xl' />
		</div>
	);
};
