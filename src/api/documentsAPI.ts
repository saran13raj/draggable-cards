import axios from 'axios';
import { baseURL } from '.';
import { DocumentT } from '../utils/types';

export const fetchDocumentsOrderAPI = async () => {
	try {
		const response = await axios.get(`${baseURL}/documents`);
		return response.data;
	} catch {
		console.error('Error fetching documents');
	}
};

export const updateDocumentsOrderAPI = async (documents: DocumentT[]) => {
	try {
		const response = await axios.put(`${baseURL}/documents`, documents);
		return response.data;
	} catch {
		console.error('Error saving documents');
	}
};
