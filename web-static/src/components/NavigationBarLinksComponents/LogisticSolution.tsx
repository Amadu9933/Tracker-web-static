
import ForgotPassword from '@components/pages/BusinessOwnerPages/auth/resetPassword/forgotPassword';
// import ResetPassword from '@components/pages/BusinessOwnerPages/auth/resetPassword/resetPassword';
import GenerateTrackingID from '@components/pages/BusinessOwnerPages/manageID/GenerateTrackingID';
const LogisticSolution: React.FC = () => {
  return (
    <div>
      <GenerateTrackingID />
      <ForgotPassword />

    </div>
  );
};

export default LogisticSolution;
