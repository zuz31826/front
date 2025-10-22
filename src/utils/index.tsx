import type { StrapiImage } from "../types";

const BASE_URL = import.meta.env.VITE_APP_STRAPI_URL || "http://localhost:1337";

export const getImageUrl = (image?: StrapiImage | null): string => {
	if (!image?.url) return "";

	if (image.url.startsWith("http")) {
		return image.url;
	}

	return `${BASE_URL}${image.url}`;
};
