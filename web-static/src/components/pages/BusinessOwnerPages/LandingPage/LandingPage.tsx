import Hero from "./Hero/Hero";
import Layout from "./guideSection/Layout";
import HowItWorks from "./HowItWorks/HowItWorks";

const LandingPage: React.FC = () => {
	return (
		<div className=" ">
			<Hero />
			<Layout />
			<HowItWorks />
		</div>
	);
};

export default LandingPage;
