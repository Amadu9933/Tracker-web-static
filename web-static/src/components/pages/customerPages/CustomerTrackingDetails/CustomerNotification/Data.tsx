import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

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
			width: "20px", // Width of the circle
			height: "20px", // Height of the circle
			borderRadius: "50%", // Make the circle round
			backgroundColor: index === activeIndex ? "#FF833C" : "#FFEADF", // Color based on active state
			position: "absolute", // Position the circle absolutely within the parent
			top: `calc(50% + ${offsetY}px)`, // Calculate top position
			left: `calc(50% + ${offsetX}px)`, // Calculate left position
			transform: "translate(-50%, -50%)", // Center the circle at its position
		};
	};

	return (
		// Parent Box to contain the circles and set the relative positioning
		<Box
			sx={{
				width: "250.63px", // Width of the container
				height: "230px", // Height of the container
				position: "relative", // Relative positioning for the circles to be positioned absolutely inside
				margin: "0 auto", // Center the container horizontally
			}}>
			{/* Generate 8 circles and apply the calculated styles */}
			{[...Array(8)].map((_, index) => (
				<Box key={index} sx={circleStyle(index)} />
			))}
		</Box>
	);
};

export default CircularProgress;
