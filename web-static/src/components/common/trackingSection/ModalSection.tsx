import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	height: "23.25rem",
	width: { xs: "285px", md: "29.4rem" },
	bgcolor: "white",
	border: "none",
	boxShadow: 24,
	p: 4,
	borderRadius: "0.5rem",
	paddingTop: "2.5rem",
	paddingBottom: "2.5rem",
	paddingLeft: { xs: "24px" },
	paddingRight: { xs: "24px" },
};

const buttonStyles = {
	backgroundColor: "#FF833C",
	color: "white",
	borderColor: "#FF833C",
	paddingTop: "12px",
	paddingRight: "18px",
	paddingBottom: "12px",
	paddingLeft: "18px",
	borderRadius: "8px",
	"&:focus": {
		borderColor: "#FF833C",
		backgroundColor: "#FF833C",
		color: "white",
	},
	"&:hover": {
		backgroundColor: "#FF833C",
		color: "white",
		borderColor: "#FF833C",
	},
	fontSize: "16px",
	fontWeight: "medium",
	textTransform: "none",
	width: { xs: "100%", md: "100%" },
	marginLeft: { xs: "0", md: "0" },
	marginTop: "1.5rem",
};

interface TrackingModalProps {
	open: boolean;
	handleClose: () => void;
}

const TrackingModal: React.FC<TrackingModalProps> = ({ open, handleClose }) => {
	const [email, setEmail] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const mockFetchRequest = (_email: string) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				// Simulate a network request failure
				if (Math.random() < 0.5) {
					reject(new Error("Failed to fetch data"));
				} else {
					resolve({ success: true });
				}
			}, 1000);
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!email) {
			alert("Please enter an email address");
			return;
		}

		setLoading(true);
		setError(null);

		try {
			await mockFetchRequest(email);
			navigate(`/customer-notification/${email}`);
		} catch (err) {
			setError("Failed to fetch data. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description">
			<Box sx={style}>
				<Typography
					id="modal-modal-title"
					variant="h6"
					component="h1"
					sx={{
						color: "#354755",
						fontWeight: "700",
						fontSize: { xs: "20px", md: "2rem" },
					}}>
					View order history
				</Typography>
				<Typography
					id="modal-modal-description"
					sx={{
						mt: 2,
						fontWeight: "400",
						fontSize: "1rem",
						color: "#354755",
						marginTop: "1.5rem",
						marginBottom: "1.5rem",
					}}>
					To view your order history please enter your email address associated
					with your orders.
				</Typography>
				<label className="text-[#354755] font-bold" htmlFor="">
					Email
				</label>
				<form onSubmit={handleSubmit}>
					<div className="search-container mt-3">
						<input
							className=""
							type="text"
							placeholder="example@gmail.com"
							value={email}
							onChange={handleInputChange}
							disabled={loading} // Disable input while loading
						/>
						<i className="search-icon"></i>
					</div>
					{loading ? (
						<Typography sx={{ color: "grey", mt: 2 }}>Loading...</Typography>
					) : (
						<Button type="submit" variant="outlined" sx={buttonStyles}>
							Proceed
						</Button>
					)}
				</form>
				{error && <Typography sx={{ color: "red", mt: 2 }}>{error}</Typography>}
			</Box>
		</Modal>
	);
};

export default TrackingModal;
