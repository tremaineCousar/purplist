import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	nextSong,
	prevSong,
	playPause,
} from "../../redux/features/playerSlice";
import Controls from "./Controls";
import Player from "./Player";
import Seekbar from "./Seekbar";
import Track from "./Track";
import VolumeBar from "./VolumeBar";

const MusicPlayer = () => {
	const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
		useSelector((state) => state.player);
	const [duration, setDuration] = useState(0);
	const [seekTime, setSeekTime] = useState(0);
	const [appTime, setAppTime] = useState(0);
	const [volume, setVolume] = useState(0.3);
	const [repeat, setRepeat] = useState(false);
	const [shuffle, setShuffle] = useState(false);
	const dispatch = useDispatch();

	const audioRef = useRef(null);

	// Correct usage of useRef, previously was not using React import for useRef
	console.log("Current Song:", activeSong);
	console.log("Audio Element:", audioRef.current);

	useEffect(() => {
		// This effect potentially plays the song immediately when currentIndex changes,
		// consider user interaction requirement for autoplay policies in browsers
		if (currentSongs.length && isActive) dispatch(playPause(true));
	}, [currentSongs.length, currentIndex, dispatch, isActive]);

	useEffect(() => {
		if (!audioRef.current) return;
		if (isPlaying) {
			audioRef.current.play();
		} else {
			audioRef.current.pause();
		}
	}, [isPlaying]);

	const handlePlayPause = () => {
		if (!isActive) return;
		dispatch(playPause(!isPlaying));
	};

	const handleNextSong = () => {
		const nextIndex = shuffle
			? Math.floor(Math.random() * currentSongs.length)
			: (currentIndex + 1) % currentSongs.length;
		dispatch(nextSong(nextIndex));
		dispatch(playPause(true)); // Consider playing the next song automatically
	};

	const handlePrevSong = () => {
		const prevIndex = shuffle
			? Math.floor(Math.random() * currentSongs.length)
			: currentIndex === 0
			? currentSongs.length - 1
			: currentIndex - 1;
		dispatch(prevSong(prevIndex));
		dispatch(playPause(true)); // Consider playing the previous song automatically
	};

	// const audioSrc = activeSong?.attributes?.previews?.[0]?.url;
	// // console.log("Audio URL:", audioSrc);

	return (
		<div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
			<Track
				isPlaying={isPlaying}
				isActive={isActive}
				activeSong={activeSong}
			/>
			<div className="flex-1 flex flex-col items-center justify-center">
				<Controls
					isPlaying={isPlaying}
					isActive={isActive}
					repeat={repeat}
					setRepeat={setRepeat}
					shuffle={shuffle}
					setShuffle={setShuffle}
					currentSongs={currentSongs}
					handlePlayPause={handlePlayPause}
					handlePrevSong={handlePrevSong}
					handleNextSong={handleNextSong}
				/>
				<Seekbar
					value={appTime}
					min="0"
					max={duration}
					onInput={(event) => setSeekTime(event.target.value)}
					setSeekTime={setSeekTime}
					appTime={appTime}
				/>
				<Player
					activeSong={activeSong}
					volume={volume}
					isPlaying={isPlaying}
					seekTime={seekTime}
					repeat={repeat}
					currentIndex={currentIndex}
					onEnded={handleNextSong}
					onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
					onLoadedData={(event) => setDuration(event.target.duration)}
				/>
			</div>
			<VolumeBar
				value={volume}
				min="0"
				max="1"
				onChange={(event) => setVolume(event.target.value)}
				setVolume={setVolume}
			/>
		</div>
	);
};

export default MusicPlayer;
