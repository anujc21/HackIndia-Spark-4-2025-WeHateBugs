import React, {useEffect} from "react";
import {signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {Box, Typography, Button} from "@mui/material";
import {Edit, Logout} from "@mui/icons-material";

function Profile({setPage, auth, user}){
	const navigate = useNavigate();

	const logout = () => {
		signOut(auth).then(() => {
			navigate("/login");
		});
	};

	useEffect(() => {
		setPage("profile");
	}, []);

	return (
		<Box className="page" sx={{
			width: "100%",
			height: "100%",
			display: "flex",
			alignItems: "center",
			flexDirection: "column",
			overflowY: "auto"
		}}>
			<Typography variant="h3" align="center" sx={{
				margin: "150px 0px 0px 0px",
				color: "#fff"
			}}>
				Your Profile
			</Typography>

			<Typography variant="h5" align="center" sx={{
				margin: "40px 0px 0px 0px",
				color: "#fff"
			}}>
				Username
			</Typography>

			<Typography variant="h6" align="center" sx={{
				margin: "10px 0px 0px 0px",
				color: "#ff148a"
			}}>
				{user.username}
			</Typography>

			<Typography variant="h5" align="center" sx={{
				margin: "30px 0px 0px 0px",
				color: "#fff"
			}}>
				Email
			</Typography>

			<Typography variant="h6" align="center" sx={{
				margin: "10px 0px 0px 0px",
				color: "#ff148a"
			}}>
				{user.email}
			</Typography>

			<Button sx={{
				margin: "30px 0px 20px 0px",
				padding: "10px 20px",
				background: "linear-gradient(to right, #ff148a, #ff75ba)",
				borderRadius: "50px",
				fontWeight: "bold",
				color: "#fff",
				boxShadow: "2px 4px 8px rgba(255, 115, 185, 0.5)"
			}} onClick={() => navigate("/editProfile")}>
				<Edit sx={{
					margin: "-2px 4px 0px 0px",
					fontSize: "1.2rem"
				}}/>

				Edit
			</Button>

			<Button sx={{
				margin: "0px 0px 30px 0px",
				padding: "10px 20px",
				background: "linear-gradient(to right, #b80049, #eb4688)",
				borderRadius: "50px",
				fontWeight: "bold",
				color: "#fff",
				boxShadow: "2px 4px 8px rgba(235, 70, 135, 0.5)"
			}} onClick={logout}>
				<Logout sx={{
					margin: "-2px 2px 0px 0px",
					fontSize: "1.4rem"
				}}/>

				Logout
			</Button>
		</Box>
	);
}

export default Profile;