import ForgotPassword from '@components/pages/BusinessOwnerPages/auth/resetPassword/forgotPassword';
import ResetPassword from '@components/pages/BusinessOwnerPages/auth/resetPassword/resetPassword';
//import GenerateTrackingID from '@components/pages / BusinessOwnerPages / manageID / GenerateTrackingID';
//import CongratulationsAlert from "@components/pages/BusinessOwnerPages/manageID/CongratulationsAlert";
import Otp from '@components/pages/BusinessOwnerPages/auth/resetPassword/otp';
const LogisticSolution: React.FC = () => {
  return (
    <div className="">

      <ResetPassword />
      <ForgotPassword />
      <Otp />

    </div>
  );
};

export default LogisticSolution;
