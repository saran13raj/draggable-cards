import React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import { Card } from '../components/Card';
import { apiData } from '../utils/mockData';
import { sortApiData } from '../utils';

export const DraggableContainer: React.FC = () => {
	const [data, setData] = React.useState(sortApiData(apiData));

	const handleDragEnd = (result: DropResult) => {
		const oldPosition = result.source.index;
		const newPosition = result.destination?.index || -1;
		if (
			newPosition >= 0 &&
			oldPosition < data.length &&
			newPosition >= 0 &&
			newPosition <= data.length
		) {
			const dataCopy = [...data];
			const cardToMove = data[oldPosition];

			dataCopy.splice(oldPosition, 1); // Remove the card from the old index
			dataCopy.splice(newPosition, 0, cardToMove); // Insert the card at the new index

			const updatedDataPositions = dataCopy.map((item, index) => ({
				...item,
				position: index // Set position based on current index
			}));

			setData(updatedDataPositions);
		}
	};

	return (
		<>
			<DragDropContext onDragEnd={handleDragEnd}>
				<Droppable droppableId='cards' direction='horizontal'>
					{(droppableProvided) => (
						<div
							ref={droppableProvided.innerRef}
							{...droppableProvided.droppableProps}
							// className='grid grid-cols-3 gap-10'
							className='flex'
							//
						>
							{data.map((d, index) => (
								<Draggable key={d.type} draggableId={d.type} index={index}>
									{(draggableProvided, snapShot) => (
										<div
											ref={draggableProvided.innerRef}
											{...draggableProvided.draggableProps}
											{...draggableProvided.dragHandleProps}>
											<Card
												data={d}
												index={index}
												isDragging={snapShot.isDragging}
											/>
										</div>
									)}
								</Draggable>
							))}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</>
	);
};
