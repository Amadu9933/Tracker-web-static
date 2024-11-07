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

  // useEffect hook to update the active circle index every 500ms
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 8); // Cycle through 0 to 7
    }, 500); // Change active circle every 500ms
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Function to calculate the style for each circle based on its index
  const circleStyle = (index: number): React.CSSProperties => {
    // Calculate the angle for the current index
    const angle = (index / 8) * 2 * Math.PI;
    const radius = 80; // Radius of the circular path
    // Calculate the X and Y offsets based on the angle
    const offsetX = radius * Math.cos(angle);
    const offsetY = radius * Math.sin(angle);
    return {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: index === activeIndex ? '#FF833C' : '#FFEADF', // Color based on active state
      position: 'absolute', // Position the circle absolutely within the parent
      top: `calc(50% + ${offsetY}px)`, // Calculate top position
      left: `calc(50% + ${offsetX}px)`, // Calculate left position
      transform: 'translate(-50%, -50%)', // Center the circle at its position
      marginLeft: '400px',
    };
  };

  return (
    <div className="flex  m-auto bg-gray-500 opacity-25 h-full border-none absolute ">
      <Box
        sx={{
          width: '250.63px', // Width of the container
          height: '230px', // Height of the container
          margin: '0 auto', // Center the container horizontally
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
