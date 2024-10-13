import { http, HttpResponse } from 'msw';

import { documentsMock } from './mockData';
import { baseURL } from '../api';

export const handlers = [
	http.get(`${baseURL}/documents`, () => {
		const savedData = localStorage.getItem('documents');
		// return last saved order
		if (savedData && savedData !== 'undefined') {
			return HttpResponse.json(JSON.parse(savedData));
		}
		return HttpResponse.json(documentsMock);
	}),
	http.put(`${baseURL}/documents`, async ({ request }) => {
		const updatedDocuments = await request.json();

		localStorage.setItem('documents', JSON.stringify(updatedDocuments));
		const savedAt = new Date();
		localStorage.setItem('last-saved-at', savedAt.toISOString());
		return HttpResponse.json(
			{ message: 'Documents order updated successfully', data: savedAt },
			{ status: 200 }
		);
	})
];
