// Navbar.tsx
import React from "react";
import fristImage from "../../../assets/first-image.png";
import thirdImage from "../../../assets/third-image.png";
import secondImage from "../../../assets/second-image.png";
import fourthImage from "../../../assets/fourth-image.png";

const CustomerDidYouKnow: React.FC = () => {
	return (
		<section className="  md:h-1/4 md:mt-56 md:bg-slate-500 ">
			{/* container  */}
			<div className="md:flex md:justify-between">
				{/* first item */}
				<div className="md:column md:ml-44 md:w-44">
					<img
						className="md:w-36 md:h-36 md:rounded-full w-16 h-16 rounded-full"
						src={fristImage}
						alt=""
					/>
					<img
						className="w-20 h-20 rounded-full mt-64 ml-24 bg-red-100"
						src={thirdImage}
						alt=""
					/>
				</div>
				{/* second item, text container */}
				<div className="md:w-1/3 md:mt-9">
					<h1 className="mb-7 font-medium text-2xl">Did You Know?</h1>
					<p className="font-normal">
						Trackerr also offers tracking services using tracking I.Ds generated
						using other logistics partners such as DHL, GIG, etc. Just enter
						your parcel i.d and click enter.
					</p>
				</div>

				{/* third container */}
				<div className="md:mr-44  md:w-60">
					<img
						className="w-20 h-20 rounded-full -mt-36 ml-40 bg-red-100"
						src={secondImage}
						alt=""
					/>
					<img
						className="md:w-36  md:h-36 md:rounded-full md:mt-96 w-36 h-36 rounded-full hidden"
						src={fourthImage}
						alt=""
					/>
				</div>
			</div>
		</section>
	);
};

export default CustomerDidYouKnow;
