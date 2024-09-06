import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import BownerBaground from "../../../assets/BownerBaground.png";

const BusinessOwnerLandingPage: React.FC = () => {
	return (
		<div className="mb-[500px]">
			<CssBaseline />
			<Container maxWidth="xl">
				<div
					className=" sm:h-[50vh] md:h-[60vh] lg:h-[500px]  bg-no-repeat bg-right  text-white text-center p-5 sm:p-3 md:p-4 lg:p-5"
					style={{
						backgroundImage: `url(${BownerBaground})`,
						backgroundSize: "750px 600px",
					}}>
					<div className=" border-red-700 border w-[756px] h-[300px]"></div>
				</div>
			</Container>
		</div>
	);
};

export default BusinessOwnerLandingPage;
