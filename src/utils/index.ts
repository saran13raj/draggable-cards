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
