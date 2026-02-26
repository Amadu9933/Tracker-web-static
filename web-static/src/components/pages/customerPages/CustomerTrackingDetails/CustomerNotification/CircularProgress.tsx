import * as React from 'react';
import Box from '@mui/material/Box';

/**
 * Renders a circular progress indicator with 8 circles that rotate in a circular path.
 *
 * @return {React.ReactElement} The rendered circular progress indicator.
 */
const CircularProgress: React.FC = () => {
  // State to track the index of the active circle
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  // responsive container size (px) and derived radius/circleSize
  const [containerSize, setContainerSize] = React.useState<number>(() => {
    if (typeof window === 'undefined') return 240;
    const w = window.innerWidth;
    // take 60% of viewport width up to 260px, minimum 120px
    return Math.max(120, Math.min(260, Math.floor(w * 0.6)));
  });

  // useEffect hook to update the active circle index every 500ms
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 8); // Cycle through 0 to 7
    }, 500); // Change active circle every 500ms
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // update container size on resize to stay responsive on mobile
  React.useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setContainerSize(Math.max(120, Math.min(260, Math.floor(w * 0.6))));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Function to calculate the style for each circle based on its index
  const circleStyle = (index: number): React.CSSProperties => {
    // Calculate the angle for the current index
    const angle = (index / 8) * 2 * Math.PI;
    const radius = Math.floor(containerSize * 0.35); // responsive radius
    // Calculate the X and Y offsets based on the angle
    const offsetX = Math.round(radius * Math.cos(angle));
    const offsetY = Math.round(radius * Math.sin(angle));
    const circleSize = Math.max(10, Math.floor(containerSize * 0.12));
    return {
      width: `${circleSize}px`,
      height: `${circleSize}px`,
      borderRadius: '50%',
      backgroundColor: index === activeIndex ? '#FF833C' : '#FFEADF', // Color based on active state
      position: 'absolute', // Position the circle absolutely within the parent
      top: `calc(50% + ${offsetY}px)`, // Calculate top position
      left: `calc(50% + ${offsetX}px)`, // Calculate left position
      transform: 'translate(-50%, -50%)', // Center the circle at its position
    };
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Box
        sx={{
          width: `${containerSize}px`, // responsive width
          height: `${containerSize}px`, // responsive height (square)
          position: 'relative', // Relative positioning for circles
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        {/* Generate 8 circles and apply the calculated styles */}
        {[...Array(8)].map((_, index) => (
          <Box key={index} sx={circleStyle(index)} />
        ))}
      </Box>
    </div>
  );
};

export default CircularProgress;
