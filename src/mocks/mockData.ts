import { DocTypeToImageMapT, DocumentT } from '../utils/types';

export const documentsMock: DocumentT[] = [
	{
		id: '1',
		type: 'bankdraft',
		title: 'Bank Draft',
		position: 0,
		image: 'https://i.pinimg.com/736x/ce/b3/50/ceb350fa618421659b23ed5602c4603e.jpg'
	},
	{
		id: '2',
		type: 'bill-of-lading',
		title: 'Bill of Lading',
		position: 1,
		image: 'https://i.pinimg.com/736x/d9/e0/75/d9e07514128c66974ce306e25f1d7062.jpg'
	},
	{
		id: '3',
		type: 'invoice',
		title: 'Invoice',
		position: 2,
		image: 'https://i.pinimg.com/736x/f0/a4/14/f0a4140de805237f7db453af420655fc.jpg'
	},
	{
		id: '4',
		type: 'bank-draft-2',
		title: 'Bank Draft 2',
		position: 3,
		image: 'https://i.pinimg.com/736x/dd/7c/1c/dd7c1ccba416cc10233d15cbe65ef506.jpg'
	},
	{
		id: '5',
		type: 'bill-of-lading-2',
		title: 'Bill of Lading 2',
		position: 4,
		image: 'https://i.pinimg.com/736x/88/0e/d4/880ed42da873bcc18d602c917285a20d.jpg'
	}
];

export const docTypeToImageMap: DocTypeToImageMapT = {
	bankdraft: 'https://i.pinimg.com/736x/ce/b3/50/ceb350fa618421659b23ed5602c4603e.jpg',
	'bill-of-lading': 'https://i.pinimg.com/736x/d9/e0/75/d9e07514128c66974ce306e25f1d7062.jpg',
	invoice: 'https://i.pinimg.com/736x/f0/a4/14/f0a4140de805237f7db453af420655fc.jpg',
	'bank-draft-2': 'https://i.pinimg.com/736x/dd/7c/1c/dd7c1ccba416cc10233d15cbe65ef506.jpg',
	'bill-of-lading-2': 'https://i.pinimg.com/736x/88/0e/d4/880ed42da873bcc18d602c917285a20d.jpg'
};
