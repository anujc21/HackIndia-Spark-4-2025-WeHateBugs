import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Typography, Button} from "@mui/material";
import {Explore, LibraryBooks, CoPresent, AccountCircle} from "@mui/icons-material";

function Dashboard({setPage, user}){
	const navigate = useNavigate();

	useEffect(() => {
		setPage("dashboard");
	}, []);

	return (
		<Box className="page" sx={{
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			flexDirection: "column",
			overflowY: "auto"
		}}>
			<Typography variant="h3" align="center" sx={{
				margin: "150px 0px 0px 0px",
				color: "#fff"
			}}>
				Welcome, <span style={{color: "#ff75ba", fontWeight: "bold"}}> {user.username}</span>!
			</Typography>

			<Typography variant="h5" align="center" sx={{
				margin: "20px 0px 0px 0px",
				color: "#ccc"
			}}>
				What would you like to do today?
			</Typography>

			<Box sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "row",
				flexWrap: "wrap",
				margin: "50px 0px 30px 0px",
				gap: "20px"
			}}>
				<Box sx={{
					width: "200px",
					height: "200px",
					background: "#fff",
					borderRadius: "30px",
					boxShadow: "2px 4px 8px rgba(255, 255, 255, 0.8)",
					padding: "20px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					"&:hover": {
						cursor: "pointer",
						transform: "scale(1.1)"
					},
					transition: "0.2s transform"
				}} onClick={() => navigate("/explore")}>
					<Typography variant="h6" align="center" sx={{
						color: "#ff148a"
					}}>
						Explore Presentations
					</Typography>

					<Explore sx={{
						fontSize: "5rem",
						color: "#ff148a"
					}}/>
				</Box>

				<Box sx={{
					width: "200px",
					height: "200px",
					background: "#fff",
					borderRadius: "30px",
					boxShadow: "2px 4px 8px rgba(255, 255, 255, 0.8)",
					padding: "20px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					"&:hover": {
						cursor: "pointer",
						transform: "scale(1.1)"
					},
					transition: "0.2s transform"
				}} onClick={() => navigate("/presentations")}>
					<Typography variant="h6" align="center" sx={{
						color: "#ff148a"
					}}>
						My Presentations
					</Typography>

					<LibraryBooks sx={{
						fontSize: "5rem",
						color: "#ff148a"
					}}/>
				</Box>

				<Box sx={{
					width: "200px",
					height: "200px",
					background: "#fff",
					borderRadius: "30px",
					boxShadow: "2px 4px 8px rgba(255, 255, 255, 0.8)",
					padding: "20px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					"&:hover": {
						cursor: "pointer",
						transform: "scale(1.1)"
					},
					transition: "0.2s transform"
				}} onClick={() => navigate("/create")}>
					<Typography variant="h6" align="center" sx={{
						color: "#ff148a"
					}}>
						Create Presentation
					</Typography>

					<CoPresent sx={{
						fontSize: "5rem",
						color: "#ff148a"
					}}/>
				</Box>
			</Box>

			<Button sx={{
				margin: "30px 0px 30px 0px",
				padding: "0px 30px",
				background: "linear-gradient(to right, #ff148a, #ff75ba)",
				borderRadius: "50px",
				height: "80px",
				fontWeight: "bold",
				color: "#fff",
				boxShadow: "2px 4px 8px rgba(255, 115, 185, 0.8)"
			}} onClick={() => navigate("/profile")}>
				<AccountCircle sx={{
					margin: "-1px 3px 0px 0px",
					fontSize: "2rem"
				}}/>

				Go to Profile
			</Button>
		</Box>
	);
}

export default Dashboard;