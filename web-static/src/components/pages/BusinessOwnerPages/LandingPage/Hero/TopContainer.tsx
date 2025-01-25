import Button from '@mui/material/Button';

const TopContainer: React.FC = () => {
  const buttonStyles = {
    backgroundColor: 'primary',
    color: '#FF833C',
    borderColor: '#FF833C',
    borderRadius: '8px',
    font: '16px',
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

    marginLeft: { xs: '0', md: '0' },
  };
  return (
    <div className="absolute w-[50.5%]  ">
      <div className="relative  mt-24 ">
        <div className="bg-gray-300   opacity-25 w-full h-full absolute"></div>
        <div className="relative text-left py-20 pl-14">
          <p className="font-bold text-[2.5rem]  text-secondary">
            Effortless parcel shipping made simple
          </p>
          <p className="text-base font-normal text-[#585858]">
            Streamline your shipping process, generates <br /> unique tracking
            IDs for your parcels. Say goodbye to logistics <br /> headaches and
            hello to efficiency.
          </p>

          <div className="my-5">
            <Button variant="outlined" sx={buttonStyles}>
              Get started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopContainer;
