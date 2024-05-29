import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetSongsDetailsQuery } from "../redux/services/shazamCore";
import { setActiveSong, playPause } from "../redux/features/playerSlice";

const SongDetails = () => {
	const dispatch = useDispatch();
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { songid } = useParams();
	console.log(songid);
	const { data: songData, isFetching: isFetchingSongDetails } =
		useGetSongsDetailsQuery({ songid });
	return (
		<div className=" flex flex-col">
			{/* <DetailsHeader artistId={artistId} songData={songData} /> */}

			<div className=" mb-10 ">
				<h2 className=" text-white text-3xl font-bold">Lairx: </h2>
				<div className=" mt-5">
					{songData.sections[0].type === "LYRICS " ? (
						songData?.section[0].text.map((line, i) => (
							<p className=" text-gray-400 text-base my-1">{line}</p>
						))
					) : (
						<p>Damn bro, we couldn't find the Lairx. 😕</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default SongDetails;
