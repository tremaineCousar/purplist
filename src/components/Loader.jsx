import { loader } from "../assets";
import React, { useState, useEffect } from "react";

const Loader = ({ title, tips }) => {
	const [randomTip, setRandomTip] = useState("");

	useEffect(() => {
		if (tips && tips.length > 0) {
			const randomNumber = Math.floor(Math.random() * tips.length);
			setRandomTip(tips[randomNumber]);
		}
	}, [tips]);

	return (
		<div className=" w-full flex justify-center items-center flex-col">
			<img src={loader} alt="loader" className=" w-32 h-32 object-contain" />
			<h1 className="font-bold text-2xl">{title || "Loading... "}</h1>
			<h3 className=" font-medium text-lg text-center">{randomTip}</h3>
		</div>
	);
};

export default Loader;
