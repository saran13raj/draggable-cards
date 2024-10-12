import { APIData } from './types';

export const sortApiData = (data: APIData[]) => {
	return data.sort((a, b) => a.position - b.position);
};
