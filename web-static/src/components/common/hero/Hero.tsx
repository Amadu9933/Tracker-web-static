import React from "react";
import MyButton from "../buttons/Mybutton";
import "./Hero.css";

const Hero: React.FC = () => {
	return (
		<div className="hero  pt-40 m-0">
			<h1 className="text-white font-bold text-8xl h-48 mx-72 ">
				Track your parcel today!
			</h1>
			<h4 className="mx-80 text-white  text-2xl mt-9">
				Get real-time location of your parcel from the comfort of your home with
				trackerr.
			</h4>
		</div>
	);
};

export default Hero;
