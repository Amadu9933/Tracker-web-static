import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";

import { BownerBaground, smallBox } from "../.././../../../assets/asset";

import TopContainer from "./TopContainer";

const BusinessOwnerLandingPage: React.FC = () => {
	return (
		<div className="px-0 mx-0">
			<ScopedCssBaseline />
			<Container maxWidth="xl" sx={{ padding: "0 !important" }}>
				<div
					className="relative sm:h-[50vh] md:h-[60vh] lg:h-[500px] bg-no-repeat bg-right text-white text-center p-5 sm:p-3 md:p-4 lg:p-5"
					style={{
						backgroundImage: `url(${BownerBaground})`,
						backgroundSize: "70% 100%",
						padding: "0px",
					}}>
					<div className="absolute  inset-0 bg-[#B3C3CF33] opacity-20 ml-[30%]  "></div>{" "}
					{/* Overlay */}
					<div className="relative w-full h-full">
						<img
							src={smallBox}
							alt="ellipse"
							className="mt-12 ml-10 h-20 w-24 absolute"
						/>
						<TopContainer />
					</div>
				</div>
			</Container>
		</div>
	);
};

export default BusinessOwnerLandingPage;
