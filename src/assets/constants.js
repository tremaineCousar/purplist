import { GiStarCycle } from "react-icons/gi";
import { FaChartLine } from "react-icons/fa";
import { TbHomeMove } from "react-icons/tb";
import { RiUserLocationLine } from "react-icons/ri";

export const genres = [
	{ title: "Pop", value: "POP" },
	{ title: "Hip-Hop/Rap", value: "HIP_HOP_RAP" },
	{ title: "Dance", value: "DANCE" },
	{ title: "Electronic", value: "ELECTRONIC" },
	{ title: "Soul", value: "SOUL_RNB" },
	{ title: "Alternative", value: "ALTERNATIVE" },
	{ title: "Rock", value: "ROCK" },
	{ title: "Latin", value: "LATIN" },
	{ title: "Film", value: "FILM_TV" },
	{ title: "Country", value: "COUNTRY" },
	{ title: "Worldwide", value: "WORLDWIDE" },
	{ title: "Reggae", value: "REGGAE_DANCE_HALL" },
	{ title: "House", value: "HOUSE" },
	{ title: "K-Pop", value: "K_POP" },
	{ title: "...Please select a genre ", value: "Please select a genre" },
];

export const links = [
	{ name: "Discover", to: "/", icon: TbHomeMove },
	{ name: "Around You", to: "/around-you", icon: RiUserLocationLine },
	{ name: "Top Artists", to: "/top-artists", icon: GiStarCycle },
	{ name: "Top Charts", to: "/top-charts", icon: FaChartLine },
];
