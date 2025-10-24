interface StrapiImageFormat {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path: string | null;
	size: number;
	width: number;
	height: number;
}

export interface StrapiImage {
	id: number;
	documentId: string;
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	formats: {
		thumbnail?: StrapiImageFormat;
		small?: StrapiImageFormat;
		medium?: StrapiImageFormat;
		large?: StrapiImageFormat;
	};
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: string | null;
	provider: string;
	provider_metadata: Record<string, any> | null;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface Illustration {
	name: string;
	image: StrapiImage;
	description?: string;

	id: number;
	createdAt: string;
	documentId: string;
	publishedAt: string;
	updatedAt: string;
}

export interface Portfolio {
	portfolio: StrapiImage[];
	description?: string;
	id: number;
	createdAt: string;
	documentId: string;
	publishedAt: string;
	updatedAt: string;
}
