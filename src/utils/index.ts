import { DocumentT } from './types';

export const sortDocuments = (data: DocumentT[]) => {
	return data.sort((a, b) => a.position - b.position);
};

export const elapsedTime = (date: Date | null): string => {
	if (!date) return 'Unknown';
	const now = new Date();
	const elapsedMilliseconds = now.getTime() - date.getTime();
	const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

	if (elapsedSeconds < 60) {
		return `${elapsedSeconds} second${elapsedSeconds === 1 ? '' : 's'} ago`;
	}

	const elapsedMinutes = Math.floor(elapsedSeconds / 60);

	if (elapsedMinutes < 60) {
		return `${elapsedMinutes} minute${elapsedMinutes === 1 ? '' : 's'} ago`;
	}

	const elapsedHours = Math.floor(elapsedMinutes / 60);
	return `${elapsedHours} hour${elapsedHours === 1 ? '' : 's'} ago`;
};

export const splitArray = <T>(array: T[], chunkSize: number): T[][] => {
	const result: T[][] = [];

	for (let i = 0; i < array.length; i += chunkSize) {
		result.push(array.slice(i, i + chunkSize));
	}

	return result;
};

export const moveDocBetweenChunks = (
	documents: DocumentT[],
	sourceIndex: number,
	destinationIndex: number,
	sourceDroppableId: string,
	destinationDroppableId: string,
	chunkSize: number
) => {
	// determine which chunk the item is coming from and going to
	const sourceChunkIndex = parseInt(sourceDroppableId.split('_')[1], 10); // documents_0
	const destinationChunkIndex = parseInt(destinationDroppableId.split('_')[1], 10); // documents_1

	const docsCopy = [...documents];

	const cardToMove = docsCopy[sourceChunkIndex * chunkSize + sourceIndex]; // calculate global index

	const destinationIndexAdjusted =
		destinationChunkIndex * chunkSize +
		destinationIndex -
		(destinationChunkIndex > sourceChunkIndex ? 1 : 0); // subtract 1 for multi row below

	docsCopy.splice(sourceChunkIndex * chunkSize + sourceIndex, 1); // remove from old index
	docsCopy.splice(destinationIndexAdjusted, 0, cardToMove); // insert at new index

	// update positions based on current state
	const updatedDocPositions = docsCopy.map((item, index) => ({
		...item,
		position: index
	}));

	return updatedDocPositions;
};
