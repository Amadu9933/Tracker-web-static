// Navbar.tsx
import React from "react";
import fristImage from "../../../assets/first-image.png";
import thirdImage from "../../../assets/third-image.png";
import secondImage from "../../../assets/second-image.png";
import fourthImage from "../../../assets/fourth-image.png";
import Button from "@mui/material/Button";

const CustomerDidYouKnow: React.FC = () => {
	return (
		<section className="  md:h-1/4 md:mt-56   md:px-0 px-7 text-[#354755]">
			{/* container  */}
			<div className="md:flex md:justify-between">
				{/* first item */}
				<div className="md:block md:ml-44 md:w-44 flex justify-between ">
					<div className="md:w-36 md:h-36 md:rounded-full w-16 h-16 rounded-full">
						<img
							className="md:w-36 md:h-36 md:rounded-full w-16 h-16 rounded-full"
							src={fristImage}
							alt=""
						/>
					</div>

					<img
						className="md:w-20 md:h-20 rounded-full md:mt-64 md:ml-24 w-12 h-12  bg-red-100 md:visible invisible"
						src={thirdImage}
						alt=""
					/>

					{/* mobile pic */}
					<div className="">
						<img
							className="md:w-20 md:h-20 rounded-full md:-mt-36 nd:ml-40 bg-red-100 md:invisible w-12 h-12 "
							src={secondImage}
							alt=""
						/>
					</div>
				</div>
				{/* second item, text container */}
				<div className="md:w-1/3 md:mt-9  ">
					<h1 className="mb-7 font-medium text-2xl">Did You Know?</h1>
					<p className="font-normal mb-4 text-base">
						Trackerr also offers tracking services using tracking I.Ds generated
						using other logistics partners such as DHL, GIG, etc. Just enter
						your parcel i.d and click enter.
					</p>

					<Button
						variant="outlined"
						sx={{
							color: "#FF833C",
							borderColor: "#FF833C",
							paddingTop: "12px",
							paddingRight: "18px",
							paddingBottom: "12px",
							paddingLeft: "18px",
							borderRadius: "8px",

							"&:focus": {
								borderColor: "#FF833C",
							},
							"&:hover": {
								backgroundColor: "#FF833C",
								color: "white",
								borderColor: "#FF833C",
							},
							fontSize: "16px",
							fontWeight: "medium",
							textTransform: "none",
						}}>
						Track my parcel
					</Button>
				</div>

				{/* third container */}
				<div className="md:mr-44  md:w-60 md:block ">
					<div className="flex justify-center items-center w-20 h-20 rounded-full -mt-36 ml-40 bg-red-100  md:visible invisible">
						<img className="w-16 h-17 " src={secondImage} alt="" />
					</div>
					<img
						className="md:w-36  md:h-36 md:rounded-full md:mt-96 w-36 h-36 rounded-full md:content md:visible invisible"
						src={fourthImage}
						alt=""
					/>
					{/* moile picture */}
				</div>
				<div className=" justify-center items-center md:hidden flex">
					<img
						className="md:w-20 md:h-20 rounded-full md:mt-64 md:ml-24 w-12 h-12 bg-red-100 md:invisible "
						src={thirdImage}
						alt=""
					/>
				</div>
			</div>
		</section>
	);
};

export default CustomerDidYouKnow;
