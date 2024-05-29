import React from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({ isPlaying, activeSong, song, play, pause }) => {
	// Log props to the console

	// Return either a pause or play icon based on the condition
	return isPlaying && activeSong?.attributes?.name === song.attributes?.name ? (
		<FaPauseCircle size={35} style={{ color: "#6420AA" }} onClick={pause} />
	) : (
		<FaPlayCircle size={35} style={{ color: "#6420AA" }} onClick={play} />
	);
};

export default PlayPause;
