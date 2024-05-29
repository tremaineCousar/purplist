import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, i, isPlaying, data, activeSong }) => {
	const dispatch = useDispatch();

	const pauseClick = () => {
		dispatch(playPause(false));
	};

	const playClick = () => {
		dispatch(setActiveSong({ song, data, i }));
		dispatch(playPause(true));
	};

	return (
		<div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-50 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer relative group overflow-y-auto">
			<div className="relative w-full h-56">
				<div
					className={`absolute inset-0 justify-center items-center bg-black bg-opacity-70 overlay hidden group-hover:flex ${
						activeSong?.attributes?.name === song?.attributes?.name
							? "active"
							: ""
					}`}
				>
					{
						<PlayPause
							song={song}
							pause={pauseClick}
							play={playClick}
							isPlaying={isPlaying}
							activeSong={activeSong}
						/>
					}
				</div>
				<img alt="song_images" src={song?.attributes.artwork.url} />
			</div>

			<div className=" mt-4 flex flex-col">
				<p className=" font-semibold text-lg text-white truncate">
					<Link to={`/songs/${song?.id}`}>{song?.attributes?.name}</Link>
				</p>
				<p className=" text-sm text-white truncate">
					<Link
						to={
							song?.artists
								? `/artists/${song?.artists[0]?.adamid}`
								: "/top-artists"
						}
					>
						{song?.attributes.artistName}
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SongCard;
