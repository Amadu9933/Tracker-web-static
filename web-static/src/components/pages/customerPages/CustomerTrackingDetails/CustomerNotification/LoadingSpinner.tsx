import * as React from 'react';
import Box from '@mui/material/Box';

/**
 * Renders a small inline loading spinner with 8 circles that rotate in a circular path.
 * This is a compact version for inline usage (like buttons, small sections).
 *
 * @return {React.ReactElement} The rendered inline loading spinner.
 */
const LoadingSpinner: React.FC = () => {
    // State to track the index of the active circle
    const [activeIndex, setActiveIndex] = React.useState<number>(0);

    // useEffect hook to update the active circle index every 300ms
    React.useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % 8); // Cycle through 0 to 7
        }, 300); // Change active circle every 300ms
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    // Function to calculate the style for each circle based on its index
    const circleStyle = (index: number): React.CSSProperties => {
        // Calculate the angle for the current index
        const angle = (index / 8) * 2 * Math.PI;
        const radius = 12; // Smaller radius for inline usage
        // Calculate the X and Y offsets based on the angle
        const offsetX = radius * Math.cos(angle);
        const offsetY = radius * Math.sin(angle);
        return {
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: index === activeIndex ? '#FF833C' : '#FFEADF', // Color based on active state
            position: 'absolute', // Position the circle absolutely within the parent
            top: `calc(50% + ${offsetY}px)`, // Calculate top position
            left: `calc(50% + ${offsetX}px)`, // Calculate left position
            transform: 'translate(-50%, -50%)', // Center the circle at its position
        };
    };

    return (
        <Box
            sx={{
                width: '30px', // Compact width
                height: '30px', // Compact height
                position: 'relative', // Relative positioning for circles
                display: 'inline-block', // Inline display for button usage
            }}
        >
            {/* Generate 8 circles and apply the calculated styles */}
            {[...Array(8)].map((_, index) => (
                <Box key={index} sx={circleStyle(index)} />
            ))}
        </Box>
    );
};

export default LoadingSpinner;
