export type DocumentT = {
	id: string;
	type: string;
	title: string;
	position: number;
	image: string;
};

export type DocTypeToImageMapT = Record<string, string>;
