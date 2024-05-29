import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import "swiper/css";
import "swiper/css/free-mode";

const TopPlay = () => {
	const divRef = useRef(null);
	const dispatch = useDispatch();
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const [retryAfter, setRetryAfter] = useState(null);

	useEffect(() => {
		divRef.current.scrollIntoView({ behavior: "smooth" });
	}, []);

	const { data, error, refetch } = useGetTopChartsQuery(undefined, {
		skip: retryAfter !== null,
	});

	useEffect(() => {
		if (error?.status === 429) {
			const retryAfterHeader = error?.headers?.get("Retry-After");
			const retryAfterSeconds = parseInt(retryAfterHeader, 10);

			if (!isNaN(retryAfterSeconds)) {
				setRetryAfter(Date.now() + retryAfterSeconds * 1000);

				const timeout = setTimeout(() => {
					setRetryAfter(null);
					refetch();
				}, retryAfterSeconds * 1000);

				return () => clearTimeout(timeout);
			}
		}
	}, [error, refetch]);

	const topPlays = data?.slice(0, 10);

	const pauseClick = () => {
		dispatch(playPause(false));
	};

	const playClick = (song, i) => {
		dispatch(setActiveSong({ song, data, i }));
		dispatch(playPause(true));
	};

	return (
		<div
			ref={divRef}
			className="xl:ml-6 ml-0 mb-6 xl:max-w-[500px] max-w-full flex flex-col xl:max-h-[700px] overflow-y-auto"
		>
			<div className="w-full flex flex-col">
				<div className="flex flex-row justify-between items-center">
					<h2 className="text-white font-bold text-2xl">Top Charts</h2>
					<Link to="/top-charts">
						<p className="text-white text-base cursor-pointer">See more</p>
					</Link>
				</div>
				<div className="mt-4 flex flex-col gap-1 truncate">
					{topPlays?.map((song, i) => (
						<TopChartCard
							song={song}
							i={i}
							key={song.id}
							isPlaying={isPlaying}
							activeSong={activeSong}
							pause={pauseClick}
							play={() => playClick(song, i)}
						/>
					))}
				</div>
			</div>

			<div className="w-full flex flex-col mt-8 mb-20">
				<div className="flex flex-row justify-between items-center">
					<h2 className="text-white font-bold text-2xl">Top Artists</h2>
					<Link to="/top-artists">
						<p className="text-white text-base cursor-pointer">See more</p>
					</Link>
				</div>
				<Swiper
					slidesPerView="auto"
					spaceBetween={15}
					freeMode
					centeredSlides
					centeredSlidesBounds
					modules={[FreeMode]}
					className="mt-4"
				>
					{topPlays?.map((song) => (
						<SwiperSlide
							key={song?.id} // Ensure each SwiperSlide has a unique key
							style={{ width: "25%", height: "auto" }}
							className="shadow-lg rounded-full animate-slideright"
						>
							<Link to={`/artists/${song?.attributes?.artistName}`}>
								<img
									src={song?.attributes.artwork.url}
									alt={song?.attributes?.artistName}
									className="rounded-full w-full object-cover"
								/>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

const TopChartCard = ({ song, i, isPlaying, activeSong, pause, play }) => {
	return (
		<div
			className={`w-full flex flex-row items-center hover:bg-[#8703ab] py-2 p-4 rounded-lg cursor-pointer mb-2 ${
				activeSong?.attributes?.name === song?.attributes?.name
					? "bg-[#8703ab]"
					: "bg-transparent"
			}`}
		>
			<h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
			<div className="flex-1 flex flex-row justify-between items-center">
				<img
					className="w-20 h-20 rounded-lg"
					src={song?.attributes.artwork.url}
					alt={song?.attributes?.name}
				/>
				<div className="flex-1 flex flex-col justify-center mx-3">
					<Link to={`/songs/${song?.id}`}>
						<p className="text-lg font-medium text-white truncate">
							{song?.attributes?.name}
						</p>
					</Link>
					<Link
						to={
							song.artists
								? `/artists/${song?.artists[0]?.adamid}`
								: "/top-artists"
						}
					>
						<p className="text-base text-gray-300 mt-1">
							{song?.attributes?.artistName}
						</p>
					</Link>
				</div>
			</div>
			<PlayPause
				song={song}
				pause={pause}
				play={play}
				isPlaying={isPlaying}
				activeSong={activeSong}
			/>
		</div>
	);
};

export default TopPlay;
