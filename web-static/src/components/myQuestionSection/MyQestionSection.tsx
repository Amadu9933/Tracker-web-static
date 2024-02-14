import React from "react";
import robot from "../../../src/assets/robot.png";

const MyQestionSection: React.FC = () => {
	return (
		<section className=" justify-center  md:flex block md:mt-56 md:mb-60 mt-16 mb-16 text-[#354755] md:px-0 px-5">
			<div className="md:block text-center md:ml-36 md:w-[39.25rem]  md:h-[5.5rem] ">
				<h1 className="text-2xl font-bold mb-6">Have A Question ?</h1>
				<p className="text-base">
					Check out the FAQ section for already answered questions that will
					give you clarity or reach out to our contact centre via email:
					<span className="text-[#FF833C] underline ">
						helptrackerr@gmail.com
					</span>{" "}
					or call 00235545 for enquiry.
				</p>
			</div>
			<div className="   md:ml-36 md:visible invisible ">
				<img className="md:w-36 md:h-40 w-0 h-0 " src={robot} alt="robot" />
			</div>
		</section>
	);
};

export default MyQestionSection;
