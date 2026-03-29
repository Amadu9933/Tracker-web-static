import Container from '@mui/material/Container';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import { BownerBaground, smallBox } from '../../../../../assets/asset';
import TopContainer from './TopContainer';

const BusinessOwnerLandingPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#0b111f] transition-colors duration-300">
      <ScopedCssBaseline />
      <Container maxWidth="xl" sx={{ padding: '0 !important' }}>
        <div
          className="relative sm:h-[50vh] md:h-[60vh] lg:h-[650px] bg-no-repeat bg-right text-white text-center p-5 sm:p-3 md:p-4 lg:p-5"
          style={{
            backgroundImage: `url(${BownerBaground})`,
            backgroundSize: '70% 100%',
            padding: '0px',
          }}
        >
          {/* Overlay — lighter in dark mode */}
          <div className="absolute inset-0 bg-[#B3C3CF33] dark:bg-[#0b111f66] opacity-20 dark:opacity-40 ml-[30%]" />

          <div className="relative w-full h-full">
            {/* Decorative box — dimmed in dark mode */}
            <img
              src={smallBox}
              alt="ellipse"
              className="mt-12 ml-10 h-20 w-24 absolute dark:opacity-30"
            />
            <TopContainer />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BusinessOwnerLandingPage;