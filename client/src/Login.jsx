import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {signInWithPopup} from "firebase/auth";
import {Box, Typography, TextField, Button} from "@mui/material";
import {Google} from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";

function Login({setPage, endpoint, provider, auth, setUser}){
	const navigate = useNavigate();

	const login = () => {
        signInWithPopup(auth, provider).then((result) => {
        	const user = result.user;

            if (user){
                axios.get(`${endpoint}/getUser`, {
                    headers: {
                        "x-user-data": JSON.stringify(user)
                    }
                }).then((res) => {
                    const data = res.data;

                    setUser(data.user);

		            Swal.fire({
		                toast: true,
		                position: "bottom-left",
		                icon: "success",
		                title: `Logged in as ${data.user.username}`,
		                showConfirmButton: false,
		                timer: 3000,
		                timerProgressBar: true
		            });

		            navigate("/dashboard");
                });
            }
        }).catch((error) => {
            console.log(error);
        });
	};

	useEffect(() => {
		setPage("login");
	}, []);

	return (
		<Box className="page" sx={{
			width: "100%",
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			overflowY: "auto"
		}}>
			<Box sx={{
				margin: "50px 0px 0px 0px",
				width: "500px",
				maxWidth: "90%",
				background: "#fff",
				borderRadius: "20px",
				boxShadow: "2px 4px 8px rgba(255, 255, 255, 0.8)",
				display: "flex",
				alignItems: "center",
				flexDirection: "column"				
			}}>
				<Box sx={{
					margin: "10px 0px 5px 0px",
					width: "150px",
					height: "150px",
					backgroundImage: "url(./NexlideLogo.png)",
					backgroundSize: "cover",
					backgroundPostion: "center center",
					backgroundRepeat: "no-repeat"
				}}></Box>

				<Typography variant="h6" sx={{
					fontSize: "36px",
					margin: "0px 0px 5px 0px"
				}}>
					Login
				</Typography>

				<Typography variant="body1" align="center" sx={{
					fontSize: "20px",
					margin: "0px 20px 25px 20px"
				}}>
					Login to <span style={{color: "#ff148a", fontWeight: "bold"}}> Nexlide </span> with your Google account.
				</Typography>

				<Button sx={{
					margin: "5px 0px 30px 0px",
					padding: "10px 20px",
					background: "linear-gradient(to right, #ff148a, #ff75ba)",
					borderRadius: "50px",
					fontWeight: "bold",
					color: "#fff",
					boxShadow: "2px 4px 8px rgba(255, 115, 185, 0.5)"
				}} onClick={login}>
					<Google sx={{
						margin: "-2px 3px 0px 0px"
					}}/>

					Login with Google
				</Button>
			</Box>
		</Box>
	);
}

export default Login;