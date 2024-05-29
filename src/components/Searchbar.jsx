import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { TbCup } from "react-icons/tb";

const Searchbar = () => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState();

	const handleSumbit = (e) => {
		e.preventDefault();
		navigate(`/search/${searchTerm}`);
	};

	return (
		<form
			onSubmit={handleSumbit}
			autoComplete="off"
			className="p-2 text-gray-400 focus-within:text-gray-600 mx-auto w-2/3"
		>
			<label htmlFor=" search-field" className="sr-only">
				search all songs
			</label>

			<div className=" flex flex-row justify-start items-center rounded-full p-2">
				<TbCup className=" w-8 h-6 mr-2  " style={{ color: "white" }} />
				<input
					name="search-field"
					autoComplete="off"
					id="search-field"
					placeholder="Search"
					type="search"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className=" flex-1 bg-purple-500 bg-opacity-10 border-none outline-none text-base placeholder-white text-white p-4 rounded-full text-left justify-start"
				/>
			</div>
		</form>
	);
};

export default Searchbar;
