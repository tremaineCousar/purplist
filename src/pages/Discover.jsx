import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useGetSongsByGenreQuery } from "../redux/services/shazamCore";

const Discover = () => {
	const dispatch = useDispatch();
	const { activeSong, isPlaying, genreListId } = useSelector(
		(state) => state.player
	);
	const [retryAfter, setRetryAfter] = useState(null);

	const genreTitle = genres.find(({ value }) => value === genreListId)?.title;
	const { data, isFetching, error, refetch } = useGetSongsByGenreQuery(
		genreListId,
		{
			skip: retryAfter !== null,
		}
	);

	const filteredData =
		data && Array.isArray(data)
			? data.filter((song) => song.attributes.genreNames.includes(genreTitle))
			: [];

	useEffect(() => {
		if (error?.status === 429) {
			const retryAfterHeader = error?.headers?.get("Retry-After");
			const retryAfterSeconds = parseInt(retryAfterHeader, 10);

			if (!isNaN(retryAfterSeconds)) {
				setRetryAfter(Date.now() + retryAfterSeconds * 1000);

				const timeout = setTimeout(() => {
					setRetryAfter(null);
					refetch();
				}, retryAfterSeconds * 5);

				return () => clearTimeout(timeout);
			}
		}
	}, [error, refetch]);

	const handleChangeGenre = (e) => {
		const selectedGenre = e.target.value;
		dispatch(selectGenreListId(selectedGenre));
	};

	if (isFetching)
		return (
			<Loader
				title="Loading Songs..."
				tips={[
					"Are connected to the internet",
					"A song a day, keeps the negatives away",
					"Did you know... music is music",
					"Tell someone Happy Birthday",
				]}
			/>
		);

	if (error && error.status !== 429) return <Error />;

	return (
		<div className="flex flex-col">
			<div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
				<h2 className="font-bold text-3xl text-white text-left">
					Discover {genreTitle}
				</h2>
				<select
					onChange={handleChangeGenre}
					value={genreListId || "Please select a genre"}
					className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
				>
					{genres.map((genre) => (
						<option key={genre.value} value={genre.value}>
							{genre.title}
						</option>
					))}
				</select>
			</div>
			<div className="flex flex-wrap sm:justify-start justify-center gap-6">
				{filteredData?.map((song, i) => (
					<SongCard
						key={song?.id}
						song={song}
						i={i}
						isPlaying={isPlaying}
						activeSong={activeSong}
						data={data}
					/>
				))}
			</div>
		</div>
	);
};

export default Discover;
