import { useState } from "react";
import React from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { HiMenu } from "react-icons/hi";

import { purpList } from "../assets";
import { links } from "../assets/constants";
const NavLinks = () => (
	<div className=" mt-10">
		{links.map((item) => (
			<NavLink
				key={item.name}
				to={item.to}
				className=" flex flex-row justify-start items-center my-8 lg:text-lg text-sm font-medium text-white hover:text-purple-400"
				onClick={() => handleClick && handleClick()}
			>
				<item.icon className=" w-6 h-6 mr-2" />
				{item.name}
			</NavLink>
		))}
	</div>
);

const Sidebar = () => {
	const [mobileMenuOpen, setmMobileMenuOpen] = useState(false);

	return (
		<>
			{/* navbar for desktop */}
			<div className=" md:flex hidden flex-col w-[240px] py-10 px-4 bg-black ">
				<img
					src={purpList}
					alt="my-logo"
					className=" w-full h-24 object-contain"
				></img>
				<NavLinks />
			</div>
			{/* navbar closed icon for mobile */}

			<div className=" absolute md:hidden block top-6 right-3">
				{mobileMenuOpen ? (
					<RiCloseLine
						className=" w-8 h-6 text-white mr-2 justify-center mt-2"
						onClick={() => setmMobileMenuOpen(false)}
					/>
				) : (
					<HiMenu
						className=" w-8 h-6 text-white mr-2 justify-center mt-2"
						onClick={() => setmMobileMenuOpen(true)}
					/>
				)}
			</div>

			{/* navbar  for mobile */}

			<div
				className={` absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#8703ab] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
					mobileMenuOpen ? "left-0" : "-left-full"
				} `}
			>
				<img
					src={purpList}
					alt="my-logo"
					className=" w-full h-24 object-contain"
				></img>
				<NavLinks handleClick={() => setmMobileMenuOpen(false)} />
			</div>
		</>
	);
};
export default Sidebar;
