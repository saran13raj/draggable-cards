import React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import _ from 'lodash';

import { DocumentCard } from './DocumentCard';
import {
	elapsedTime as elapsedTimeUtil,
	moveDocBetweenChunks,
	sortDocuments,
	splitArray
} from '../utils';
import { fetchDocumentsOrderAPI, updateDocumentsOrderAPI } from '../api/documentsAPI';
import { DocumentT } from '../utils/types';
import { Modal } from './Modal';
import { Spinner } from './Spinner';

const gridCount = 3;

export const DocumentsContainer: React.FC = () => {
	const [documents, setDocuments] = React.useState<DocumentT[]>([]);
	const [showImage, setShowImage] = React.useState<boolean>(false);
	const [currentDoc, setCurrentDoc] = React.useState<DocumentT | null>(null);
	const [lastSavedAt, setLastSavedAt] = React.useState<Date | null>(() => {
		const savedDate = localStorage.getItem('last-saved-at');
		return savedDate ? new Date(savedDate) : null;
	});
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
		setElapsedTime(elapsedTimeUtil(lastSavedAt));
	}, []);

	React.useEffect(() => {
		const intervalId = setInterval(autoSave, 5000);

		return () => clearInterval(intervalId);
	}, [documents, lastSavedAt]);

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) {
			return; // dropped outside of a droppable area
		}

		const { source, destination } = result;

		const updatedDocPositions = moveDocBetweenChunks(
			documents,
			source.index,
			destination.index,
			source.droppableId,
			destination.droppableId,
			gridCount
		);

		setDocuments(updatedDocPositions);
	};

	const onExpand = (documents: DocumentT) => {
		setCurrentDoc(documents);
		setShowImage(true);
	};

	const updateDocumentsHelper = (documents: DocumentT[]) => {
		setAPIUpdatePending(true);
		updateDocumentsOrderAPI(documents)
			.then((res) => {
				const dateTime = new Date(res.data);
				setLastSavedAt(dateTime);
				setElapsedTime(elapsedTimeUtil(dateTime));
			})
			.finally(() => setAPIUpdatePending(false));
	};

	const autoSave = async () => {
		const savedData = localStorage.getItem('documents');

		if (savedData) {
			const oldDocumentsOrder = JSON.parse(savedData);
			const isOrderChanged = !_.isEqual(oldDocumentsOrder, documents);
			if (isOrderChanged) {
				updateDocumentsHelper(documents);
				return;
			}
		} else {
			// first save
			updateDocumentsHelper(documents);
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
				{splitArray(documents, gridCount).map((chunk, index) => (
					<Droppable
						key={`documents_${index}`}
						droppableId={`documents_${index}`}
						direction='horizontal'>
						{(droppableProvided) => (
							<div
								ref={droppableProvided.innerRef}
								{...droppableProvided.droppableProps}
								className='flex gap-10 md:gap-20 mb-10'>
								{chunk &&
									chunk.map((d, index) => (
										<Draggable key={d.id} draggableId={d.id} index={index}>
											{(draggableProvided, snapShot) => (
												<div
													ref={draggableProvided.innerRef}
													{...draggableProvided.draggableProps}
													{...draggableProvided.dragHandleProps}
													className='focus:outline-none w-44'>
													<DocumentCard
														data={d}
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
				))}
			</DragDropContext>
			{showImage && (
				<Modal show={showImage} onClose={setShowImage}>
					{currentDoc && (
						<div className='p-10 text-white'>
							<p className='py-3'>{currentDoc.title}</p>
							<div className='flex flex-col justify-center items-center'>
								<img
									src={currentDoc.image}
									alt={currentDoc.title}
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
