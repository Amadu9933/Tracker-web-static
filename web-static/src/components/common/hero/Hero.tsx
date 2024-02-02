import React from "react";
import MyButton from "../buttons/Mybutton";
import "./Hero.css";

const Hero: React.FC = () => {
	const handleClick = () => {
		console.log("Button clicked!");
	};

	return <div className="hero h-96 bg-slate-600 m-0"></div>;
};

export default Hero;
