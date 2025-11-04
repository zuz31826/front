import axios from "axios";
import type {
	AboutMe,
	Illustration,
	Painting,
	Portfolio,
	Sketches,
} from "../types";

const apiUrl = import.meta.env.VITE_APP_STRAPI_URL;

async function fetchWithCache<T>(key: string, endpoint: string): Promise<T> {
	try {
		const cached = sessionStorage.getItem(key);
		if (cached) {
			return JSON.parse(cached);
		}

		const res = await axios.get(`${apiUrl}${endpoint}`);
		const data = res.data.data;

		sessionStorage.setItem(key, JSON.stringify(data));
		return data;
	} catch (err) {
		console.error(`❌ Error fetching ${key} data:`, err);
		throw new Error("Failed to load content. Please try again later.");
	}
}

export async function fetchAboutMeApi(): Promise<AboutMe[]> {
	return fetchWithCache<AboutMe[]>("aboutMe", "/api/abouts?populate=*");
}

export async function fetchIllustrationsApi(): Promise<Illustration[]> {
	return fetchWithCache<Illustration[]>(
		"illustrations",
		"/api/illustrations?populate=*"
	);
}

export async function fetchPaintingsApi(): Promise<Painting[]> {
	return fetchWithCache<Painting[]>("paintings", "/api/paintings?populate=*");
}

export async function fetchPortfolioApi(): Promise<Portfolio[]> {
	return fetchWithCache<Portfolio[]>("portfolio", "/api/portfolios?populate=*");
}

export async function fetchSketchesApi(): Promise<Sketches[]> {
	return fetchWithCache<Sketches[]>("sketches", "/api/sketchbooks?populate=*");
}
