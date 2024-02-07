// Navbar.tsx
import React from "react";
import fristImage from "../../../assets/first-image.png";
import thirdImage from "../../../assets/third-image.png";
import secondImage from "../../../assets/second-image.png";
import fourthImage from "../../../assets/fourth-image.png";

const CustomerDidYouKnow: React.FC = () => {
	return (
		<section className="h-96 bg-red-200">
			{/* container  */}
			<div>
				{/* first item */}
				<div>
					<img className="" src={fristImage} alt="" />
					<img src={thirdImage} alt="" />
				</div>
				{/* second item, text container */}
				<div>
					<h1>Did You Know?</h1>
					<p>
						Trackerr also offers tracking services using tracking I.Ds generated
						using other logistics partners such as DHL, GIG, etc. Just enter
						your parcel i.d and click enter.
					</p>
				</div>

				{/* third container */}
				<div>
					<img src={secondImage} alt="" />
					<img src={fourthImage} alt="" />
				</div>
			</div>
		</section>
	);
};

export default CustomerDidYouKnow;
