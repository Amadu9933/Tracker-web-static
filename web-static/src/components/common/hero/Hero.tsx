import React from "react";
import MyButton from "../buttons/Mybutton";
import "./Hero.css";

const Hero: React.FC = () => {
	return (
		<div className="hero pt-10 md:pt-40 pb-28 ">
			<h1 className="text-white font-bold text-5xl md:text-8xl text-center md:text-center mx-6 md:mx-72">
				Track your parcel today!
			</h1>
			<h4 className="text-white text-sm md:text-2xl text-center md:text-center mt-6  md:mt-9 mx-10 px-0 md:mx-80">
				Get real-time location of your parcel from the comfort of your home with
				trackerr.
			</h4>
		</div>
	);
};

export default Hero;
