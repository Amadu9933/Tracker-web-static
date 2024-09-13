import { setting } from "../guideSection/assets/index";
const LandingPage: React.FC = () => {
	return (
		<div className=" ">
			<h1 className="text-6xl">How it works</h1>
			<div className="flex justify-between">
				<div>
					{" "}
					<img src={setting} alt="" className="w-[200px] h-[200px]" />{" "}
				</div>

				{/* sign Up */}
				<div>
					<h1 className="font-normal text-base text-secondary">
						<span className="mb-2">.</span> Step 1: Sign up/ login
					</h1>
					<p className="text-[#8E8A73] text-sm">
						Register to create account for your business by clicking the{" "}
						<span>‘Get started’</span> butto
					</p>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
