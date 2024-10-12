import React from 'react';

import { DocumentT } from '../utils/types';
import { cn } from '../utils/cn';
import { Spinner } from './Spinner';

export const DocumentCard: React.FC<{
	index: number;
	data: DocumentT;
	isDragging?: boolean;
	onExpand?: (data: DocumentT) => void;
}> = ({ index, data, isDragging, onExpand }) => {
	const [loading, setLoading] = React.useState(true);
	return (
		<div
			onClick={() => onExpand && onExpand(data)}
			className={cn(
				'h-64 w-44 rounded-xl backdrop-blur-md bg-opacity-40 flex flex-col',
				// index >= 3 ? 'col-span-1' : 'col-span-1',
				isDragging ? 'bg-gray-600' : 'bg-gray-800'
			)}>
			<p className='px-2 py-3'>{data.title}</p>
			<div className='flex flex-col justify-center h-full items-center'>
				{loading && <Spinner />}
				<img
					src={data.image}
					alt={data.title}
					className='max-h-52 w-full rounded-xl'
					onLoad={() => setLoading(false)}
					onError={() => setLoading(false)}
				/>
			</div>
		</div>
	);
};
