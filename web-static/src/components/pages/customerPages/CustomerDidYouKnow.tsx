// Navbar.tsx
import React from "react";
import fristImage from "../../../assets/first-image.png";
import thirdImage from "../../../assets/third-image.png";
import secondImage from "../../../assets/second-image.png";
import fourthImage from "../../../assets/fourth-image.png";

const CustomerDidYouKnow: React.FC = () => {
	return (
		<section className="  hidden md:h-1/4 md:mt-56 ">
			{/* container  */}
			<div className="flex justify-between">
				{/* first item */}
				<div className="column ml-44 w-44">
					<img className="w-36 h-36 rounded-full" src={fristImage} alt="" />
					<img
						className="w-20 h-20 rounded-full mt-64 ml-24 bg-red-100"
						src={thirdImage}
						alt=""
					/>
				</div>
				{/* second item, text container */}
				<div className="w-1/3 mt-9">
					<h1 className="mb-7 font-medium text-2xl">Did You Know?</h1>
					<p className="font-normal">
						Trackerr also offers tracking services using tracking I.Ds generated
						using other logistics partners such as DHL, GIG, etc. Just enter
						your parcel i.d and click enter.
					</p>
				</div>

				{/* third container */}
				<div className="mr-44  w-60">
					<img
						className="w-20 h-20 rounded-full -mt-36 ml-40 bg-red-100"
						src={secondImage}
						alt=""
					/>
					<img
						className="w-36 h-36 rounded-full mt-96"
						src={fourthImage}
						alt=""
					/>
				</div>
			</div>
		</section>
	);
};

export default CustomerDidYouKnow;
