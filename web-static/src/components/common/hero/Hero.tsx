import React from "react";
import MyButton from "../buttons/Mybutton";
import "./Hero.css";

const Hero: React.FC = () => {
	return (
		<div className="hero  pt-40 m-0">
			<h1 className="text-white font-bold text-8xl h-48 mx-72 ">
				Track your parcel today!
			</h1>
		</div>
	);
};

export default Hero;
