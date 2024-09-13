import { robot } from "../../assets/asset";

const MyQuestionSection: React.FC = () => {
	return (
		<section className="justify-center md:flex block  text-[#354755] md:px-0 px-5">
			{/* Left section containing text */}
			<div className="md:block text-center md:ml-36 md:w-[39.25rem] md:h-[5.5rem]">
				{/* header */}
				<h1 className="text-2xl font-bold mb-6">Have A Question ?</h1>
				<p className="text-base">
					Check out the FAQ section for already answered questions that will
					give you clarity or reach out to our contact centre via email:{" "}
					<span className="text-[#FF833C] underline">
						helptrackerr@gmail.com
					</span>{" "}
					or call 00235545 for enquiry.
				</p>
			</div>
			{/* Right section containing an invisible image */}
			<div className="md:ml-36 md:visible invisible">
				{/* Placeholder image */}
				<img className="md:w-36 md:h-40 w-0 h-0" src={robot} alt="robot" />
			</div>
		</section>
	);
};

export default MyQuestionSection;
