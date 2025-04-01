import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Typography, Input, Button} from "@mui/material";
import {Done, Close} from "@mui/icons-material";
import Swal from "sweetalert2";
import axios from "axios";

function EditProfile({setPage, endpoint, user, setUser}){
	const navigate = useNavigate();

	const [username, setUsername] = useState("");

	const completeEdit = () => {
		axios.get(`${endpoint}/editProfile`, {
			headers: {
				"x-user-data": JSON.stringify({
					username: username,
					uid: user.uid
				})
			}
		}).then((res) => {
			const data = res.data;

            Swal.fire({
                toast: true,
                position: "bottom-left",
                icon: "success",
                title: "Profile edit successful!",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });

			setUser((oldUser) => {
				return {
					...oldUser,
					username: username
				}
			});

			navigate("/profile");
		});
	};

	useEffect(() => {
		if (user.username){
			setUsername(user.username);
		}
	}, [user.username]);

	useEffect(() => {
		setPage("editPage");
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
				Edit Profile
			</Typography>

			<Input placeholder="Username" type="text" sx={{
				width: "600px",
				maxWidth: "90%",
				margin: "30px 0px 0px 0px",
				padding: "10px",
				color: "#fff",
				background: "rgba(255, 255, 255, 0.1)",
				borderBottom: "1px solid #ff148a"
			}} value={username} onChange={(event) => setUsername(event.target.value)}/>

			<Box sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexWrap: "wrap",
				flexDirection: "row",
				margin: "20px 0px 0px 0px",
				gap: "10px"
			}}>
				<Button sx={{
					padding: "10px 20px",
					background: "linear-gradient(to right, #ff148a, #ff75ba)",
					borderRadius: "50px",
					fontWeight: "bold",
					color: "#fff",
					boxShadow: "2px 4px 8px rgba(255, 115, 185, 0.5)"
				}} onClick={completeEdit}>
					<Done sx={{
						margin: "-2px 4px 0px 0px",
						fontSize: "1.2rem"
					}}/>

					Done
				</Button>

				<Button sx={{
					padding: "10px 20px",
					background: "linear-gradient(to right, #ff148a, #ff75ba)",
					borderRadius: "50px",
					fontWeight: "bold",
					color: "#fff",
					boxShadow: "2px 4px 8px rgba(255, 115, 185, 0.5)"
				}} onClick={() => navigate("/profile")}>
					<Close sx={{
						margin: "-2px 4px 0px 0px",
						fontSize: "1.2rem"
					}}/>

					Cancel
				</Button>
			</Box>
		</Box>
	);
}

export default EditProfile;