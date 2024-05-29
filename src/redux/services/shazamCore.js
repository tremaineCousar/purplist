import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
	reducerPath: "shazamCoreApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://shazam-core.p.rapidapi.com/v1",
		prepareHeaders: (headers) => {
			headers.set(
				"X-RapidAPI-Key",
				"04d8d3d9bfmsh670a3738e75d085p1224adjsn0d90ed8489fb"
			);

			return headers;
		},
	}),
	endpoints: (builder) => ({
		getTopCharts: builder.query({
			query: () => "/charts/world?country_code=US",
		}),
		getSongsByGenre: builder.query({
			query: (genre) => `/charts/world?country_code=US&genreNames=${genre}`,
		}),
		getSongsDetails: builder.query({
			query: (songid) => `/tracks/details?track_id=${songid}`,
		}),
	}),
});

export const {
	useGetTopChartsQuery,
	useGetSongsByGenreQuery,
	useGetSongsDetailsQuery,
} = shazamCoreApi;
