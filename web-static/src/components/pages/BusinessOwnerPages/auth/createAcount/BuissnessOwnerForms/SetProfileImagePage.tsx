import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';


const SetProfileImagePage: React.FC = () => {

    const navigate = useNavigate()

    return (
        <div className='px-[34%] pb-[20%] pt-[10%] '>
            <h1 className="text-3xl font-bold text-gray-700 flex items-center mb-6">
                <ArrowBackIcon onClick={() => navigate(-1)} className="mr-3" />
                Create Account
            </h1>
            <div className="flex justify-between mb-8">
                <p className="text-lg text-secondary">Buisness information</p>
                <p className="text-sm text-[#82826A]">Step 3 of 3</p>
            </div>
            <p className='text-left text-xs text-[#6B6856]'>Please upload a picture of your business logo or product to complete account setup.</p>
            <div className='my-10'>

                <AccountCircleOutlinedIcon sx={{ width: 200, height: 200, color: 'secondary' }} />
                <BorderColorOutlinedIcon sx={{ marginTop: -18 }} />
            </div>
            {/* Submit Button */}
            <button

                type="submit"
                className="bg-primary text-white p-2 rounded-md w-full hover:bg-primary"
            >
                Complete Sign up
            </button>
        </div>
    )
};

export default SetProfileImagePage;
