import React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import _ from 'lodash';

import { DocumentCard } from './DocumentCard';
import { elapsedTime as elapsedTimeUtil, sortDocuments } from '../utils';
import { fetchDocumentsOrderAPI, updateDocumentsOrderAPI } from '../api/documentsAPI';
import { DocumentT } from '../utils/types';
import { Modal } from './Modal';
import { Spinner } from './Spinner';

export const DocumentsContainer: React.FC = () => {
	const [documents, setDocuments] = React.useState<DocumentT[]>([]);
	const [showImage, setShowImage] = React.useState<boolean>(false);
	const [currentData, setCurrentData] = React.useState<DocumentT | null>(null);
	const [lastSavedAt, setLastSavedAt] = React.useState<Date | null>(null);
	const [elapsedTime, setElapsedTime] = React.useState<string>('Unknown');
	const [apiUpdatePending, setAPIUpdatePending] = React.useState<boolean>(false);

	React.useEffect(() => {
		const getData = async () => {
			try {
				const result = await fetchDocumentsOrderAPI();
				// sort documents based on position value
				setDocuments(sortDocuments(result));
			} catch (error) {
				console.error('Error fetching documents:', error);
			}
		};

		getData();
	}, []);

	React.useEffect(() => {
		const intervalId = setInterval(autoSave, 5000);

		return () => clearInterval(intervalId);
	}, [documents, lastSavedAt]);

	const handleDragEnd = (result: DropResult) => {
		console.log('res:::', result);
		const oldPosition = result.source.index;
		const newPosition = result?.destination ? result.destination.index : -1;
		if (
			newPosition >= 0 &&
			oldPosition < documents.length &&
			newPosition >= 0 &&
			newPosition <= documents.length
		) {
			const dataCopy = [...documents];
			const cardToMove = documents[oldPosition];

			dataCopy.splice(oldPosition, 1); // Remove the card from the old index
			dataCopy.splice(newPosition, 0, cardToMove); // Insert the card at the new index

			const updatedDocPositions = dataCopy.map((item, index) => ({
				...item,
				position: index // Set position based on current index
			}));

			setDocuments(updatedDocPositions);
		}
	};

	const onExpand = (documents: DocumentT) => {
		setCurrentData(documents);
		setShowImage(true);
	};

	const updateDocumentsHelper = (documents: DocumentT[], dateTime: Date) => {
		setAPIUpdatePending(true);
		updateDocumentsOrderAPI(documents)
			.then(() => {
				setLastSavedAt(dateTime);
				setElapsedTime(elapsedTimeUtil(dateTime));
			})
			.finally(() => setAPIUpdatePending(false));
	};

	const autoSave = async () => {
		const savedData = localStorage.getItem('documents');
		const dateTime = new Date();
		if (savedData) {
			const oldDocumentsOrder = JSON.parse(savedData);
			const isOrderChanged = !_.isEqual(oldDocumentsOrder, documents);
			if (isOrderChanged) {
				updateDocumentsHelper(documents, dateTime);
				return;
			}
		} else {
			// first save
			updateDocumentsHelper(documents, dateTime);
			return;
		}

		// only update elapsed time when no changes
		setElapsedTime(elapsedTimeUtil(lastSavedAt));
	};

	return (
		<>
			<div>
				<p className='mb-10'>Last Save: {elapsedTime}</p>
				{apiUpdatePending && (
					<div className='flex mb-10 gap-2'>
						<p>Saving</p>
						<Spinner />
					</div>
				)}
			</div>
			<DragDropContext onDragEnd={handleDragEnd}>
				<Droppable droppableId='documents' direction='horizontal'>
					{(droppableProvided) => (
						<div
							ref={droppableProvided.innerRef}
							{...droppableProvided.droppableProps}
							className='grid grid-cols-3 gap-10'
							// className='flex flex-wrap gap-10'
							//
						>
							{documents &&
								documents.map((d, index) => (
									<Draggable key={d.type} draggableId={d.type} index={index}>
										{(draggableProvided, snapShot) => (
											<div
												ref={draggableProvided.innerRef}
												{...draggableProvided.draggableProps}
												{...draggableProvided.dragHandleProps}
												className='focus:outline-none w-44'>
												<DocumentCard
													data={d}
													index={index}
													isDragging={snapShot.isDragging}
													onExpand={onExpand}
												/>
											</div>
										)}
									</Draggable>
								))}
							{droppableProvided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			{showImage && (
				<Modal show={showImage} onClose={setShowImage}>
					{currentData && (
						<div className='p-10 text-white'>
							<p className='py-3'>{currentData.title}</p>
							<div className='flex flex-col justify-center items-center'>
								<img
									src={currentData.image}
									alt={currentData.title}
									className='max-h-80 rounded-xl'
								/>
							</div>
						</div>
					)}
				</Modal>
			)}
		</>
	);
};
