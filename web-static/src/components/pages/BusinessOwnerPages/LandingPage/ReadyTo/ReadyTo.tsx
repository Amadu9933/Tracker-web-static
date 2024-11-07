import { Rocket } from '../guideSection/assets/index';
import Button from '@mui/material/Button';

const ReadyTo: React.FC = () => {
  const buttonStyles = {
    backgroundColor: 'white',
    color: '#FF833C',
    borderColor: '#FF833C',
    paddingTop: '12px',
    paddingRight: '18px',
    paddingBottom: '12px',
    paddingLeft: '18px',
    borderRadius: '8px',
    '&:focus': {
      borderColor: '#FF833C',
      backgroundColor: '#FF833C',
      color: 'white',
    },
    '&:hover': {
      backgroundColor: '#FF833C',
      color: 'white',
      borderColor: '#FF833C',
    },
    fontSize: '16px',
    fontWeight: 'medium',
    textTransform: 'none',
    width: { xs: '30%' },
    marginLeft: { xs: '0', md: '0' },
  };
  return (
    <div className="mt-24 bg-primary flex w-full  justify-between items-center">
      <div className=" w-2/4 text-left ml-12 my-12">
        <h2 className="text-5xl font-bold ">
          Ready to revolutionize your shipping game?
        </h2>
        <p className="text-sm mt-4 mb-4">Trackerr has got you covered.</p>

        <Button variant="outlined" sx={buttonStyles}>
          Get started
        </Button>
      </div>
      <div className="  right-0  absolute text-right  ">
        <img src={Rocket} alt="" className=" w-96 -mt-10   h-[357px]" />
      </div>
    </div>
  );
};

export default ReadyTo;
