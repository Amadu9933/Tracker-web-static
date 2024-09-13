import "../../../../App.css";
import "../../../../index.css";

import Footer from "../../../common/footer/Footer";
import MyQestionSection from "../../../myQuestionSection/MyQestionSection";
import CustomerTrackingDetails from "./CustomerTrackingDetails";

/**
 * Customer Tracking Detail Layout component.
 *
 * @return {JSX.Element} Returns the JSX elements for the Customer Tracking Detail Layout.
 */
const CustomerTrackingDetailLayout: React.FC = () => {
	return (
		<div>
			<main className=" justify-center ">
				<section className="mt-24 ">
					<CustomerTrackingDetails />
				</section>
				<section className=" my-24">
					<MyQestionSection />
				</section>
			</main>

			<Footer />
		</div>
	);
};
export default CustomerTrackingDetailLayout;
