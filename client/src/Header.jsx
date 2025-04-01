import React from "react";
import {useNavigate} from "react-router-dom";
import {AppBar, Toolbar, Typography, Box, Button, IconButton, Menu, MenuItem} from "@mui/material";
import {ArrowDropDown, Dashboard, AccountCircle} from "@mui/icons-material";

function Header({page}){
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = React.useState(null);

	const open = Boolean(anchorEl);

	const handleOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar sx={{
			position: "fixed",
			top: "10px",
			left: "50%",
			width: {
				xs: "94%",
				sm: "95%",
				md: "96%",
				lg: "97%"
			},
			borderRadius: "40px",
			background: "#fff",
			boxShadow: "2px 4px 8px rgba(255, 255, 255, 0.8)",
			transform: "translate(-50%, 0)"
		}}>
			<Toolbar>
				<Box sx={{
					margin: "10px 2px 10px 0px",
					width: "60px",
					height: "60px",
					backgroundImage: "url(./NexlideLogo.png)",
					backgroundSize: "cover",
					backgroundPostion: "center center",
					backgroundRepeat: "no-repeat"
				}}></Box>

				<Typography variant="h6" sx={{
					color: "#ff148a"
				}}>
					Nexlide
				</Typography>

				<Box sx={{
					margin: "0px 5px",
					display: {
						xs: "flex",
						sm: "flex",
						md: "none",
						lg: "none"
					},
					alignItems: "center",
					justifyContent: "center",
					"&:hover": {
						cursor: "pointer"
					},
					"&:active": {
						transform: "scale(0.7)"
					},
					transition: "0.2s transform"
				}} onClick={handleOpen}>
					<ArrowDropDown sx={{
						fontSize: "2rem",
						color: "#000"
					}}/>
				</Box>

				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
				>
					<MenuItem onClick={() => {navigate("/"); handleClose()}}>
						Home
					</MenuItem>

					<MenuItem onClick={() => {navigate("/about"); handleClose()}}>
						About
					</MenuItem>

					<MenuItem onClick={() => {navigate("/pricing"); handleClose()}}>
						Pricing
					</MenuItem>
				</Menu>

				<Box sx={{
					margin: "0px 20px",
					display: {
						xs: "none",
						sm: "none",
						md: "flex",
						lg: "flex"
					},
					alignItems: "center",
					flexDirection: "row"
				}}>
					<Typography variant="body1" sx={{
						margin: "0px 10px",
						color: "#000",
						"&:hover": {
							cursor: "pointer"
						}
					}} onClick={() => navigate("/")}>
						Home
					</Typography>

					<Typography variant="body1" sx={{
						margin: "0px 10px",
						color: "#000",
						"&:hover": {
							cursor: "pointer"
						}
					}} onClick={() => navigate("/about")}>
						About
					</Typography>

					<Typography variant="body1" sx={{
						margin: "0px 10px",
						color: "#000",
						"&:hover": {
							cursor: "pointer"
						}
					}} onClick={() => navigate("/pricing")}>
						Pricing
					</Typography>
				</Box>

				<Button sx={{
					margin: "0px 5px 0px auto",
					padding: "10px 20px",
					color: "#fff",
					borderRadius: "30px",
					background: "linear-gradient(to right, #ff148a, #ff75ba)",
					boxShadow: "2px 4px 8px rgba(255, 115, 185, 0.3)",
					display: {
						xs: "none",
						sm: "block"
					}
				}} onClick={() => ((page === "dashboard") ? navigate("/profile") : navigate("/dashboard"))}>
					{(page === "dashboard") &&
						<>
							<AccountCircle sx={{
								margin: "0px 3px -7px 0px"
							}}/>

							Profile
						</>
					}
					{(page !== "dashboard") &&
						<>	
							<Dashboard sx={{
								margin: "0px 3px -7px 0px"
							}}/>

							Dashboard
						</>
					}
				</Button>

				<Button sx={{
					margin: "0px 5px 0px auto",
					minWidth: "50px",
					width: "50px",
					maxWidth: "50px",
					minHeight: "50px",
					height: "50px",
					maxHeight: "50px",
					color: "#fff",
					borderRadius: "50%",
					background: "linear-gradient(to right, #ff148a, #ff75ba)",
					boxShadow: "2px 4px 8px rgba(255, 115, 185, 0.3)",
					display: {
						xs: "flex",
						sm: "none"
					},
					alignItems: "center",
					justifyContent: "center"
				}} onClick={() => ((page === "dashboard") ? navigate("/profile") : navigate("/dashboard"))}>
					{(page === "dashboard") &&
						<AccountCircle/>

					}
					{(page !== "dashboard") &&
						<Dashboard/>
					}
				</Button>

			</Toolbar>
		</AppBar>
	);
}

export default Header;