import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { avatar } from "../guideSection/assets/index";

const YouCanTrustUs: React.FC = () => {
	return (
		<div className="bg-[#FFF8EF]">
			<div className="px-[270px] ">
				<h2 className="text-3xl  text-secondary py-24">You can trust us</h2>
				<p className="text-[#8E8A73] text-sm font-medium mb-16 ">
					Dont take our word for it. Hear from happy users who have used
					Trackerr to transform their shipping experiennce.
				</p>

				<div className="border-2 border-[#8E9090] border-solid rounded-lg  justify-center items-center">
					<div className="flex justify-center items-center mb-16">
						<img
							src={avatar}
							alt="Avata"
							className="rounded-full -m-16  h-24 w-24"
						/>
					</div>
					<p className="text-sm font-normal text-secondary py-5 px-4">
						"I can't express enough how our business has transformed since i
						started using Trackerr. It's been a game-changer in every aspect.
						The seamless process of generating id for my customers and
						connecting with dispatchers to deliver in real-time is on a 100%.
					</p>
				</div>
				<div className=" justify-center py-12   items-center flex">
					<div className="border-b-2 border-b-primary pb-1  border-solid ">
						<a href="" className="text-primary  text-sm font-medium">
							View All
						</a>
						<ArrowForwardIcon
							sx={{
								color: "#FF833C",
								height: "20px",
								width: "30px",

								marginRight: "-12px",
								marginLeft: "8px",
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default YouCanTrustUs;
