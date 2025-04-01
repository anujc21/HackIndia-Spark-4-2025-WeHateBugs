import React, {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, Typography} from "@mui/material";
import {Share, Download, NextPlan} from "@mui/icons-material";
import Swal from "sweetalert2";
import axios from "axios";

function View({setPage, endpoint, currentPresentation, setCurrentPresentation, user}){
	const navigate = useNavigate();

	const share = () => {
		const shareURL = currentPresentation.url ? currentPresentation.url : "Invalid URL";

		Swal.fire({
		  title: "Share the following URL",
		  text: `${shareURL}`,
		  confirmButtonText: "Copy Link",
		  confirmButtonColor: "#ff148a",
		  allowOutsideClick: false,
		}).then((result) => {
			if (result.isConfirmed){
				navigator.clipboard.writeText(shareURL);

			    Swal.fire({
			        toast: true,
			        position: "bottom-left",
			        icon: "success",
			        title: "Link copied!",
			        showConfirmButton: false,
			        timer: 3000,
			        timerProgressBar: true
			    });
			}
		});
	};

	const download = () => {
		currentPresentation.data.writeFile({
			fileName: `${currentPresentation.name}.pptx`
		});
	};

	useEffect(() => {
		console.log(currentPresentation.url);

		if (user.uid){
			axios.get(`${endpoint}/storePresentation`, {
				headers: {
					"x-user-data": JSON.stringify({
						title: currentPresentation.name,
						file: currentPresentation.fileId,
						private: currentPresentation.private,
						uid: user.uid
					})
				}
			}).then((res) => {
				const data = res.data;

				console.log(data);
			});
		}
	}, [user]);

	useEffect(() => {
		setPage("view");

		return () => {
			setCurrentPresentation({});
		};
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
			<Box sx={{
				width: "800px",
				maxWidth: "90%",
				height: "450px",
				borderRadius: "20px",
				margin: "150px 0px 20px 0px",
				border: "5px solid #fff"
			}}>
				{(currentPresentation.url) &&
					<iframe style={{
						width: "100%",
						height: "100%",
						borderRadius: "15px",
						border: "none",
						outline: "none"
					}} src={currentPresentation.url}></iframe>
				}
				{!(currentPresentation.url) &&
					<Box sx={{
						width: "100%",
						height: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						background: "#fff",
						borderRadius: "15px"
					}}>
						<Typography variant="h6" align="center" sx={{
							color: "#ff148a"
						}}>
							No Presentation to Display
						</Typography>
					</Box>
				}
			</Box>

			<Box sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "row",
				flexWrap: "wrap",
				gap: "10px",
				margin: "0px 20px 30px 20px"
			}}>
				<Button sx={{
					padding: "10px 20px",
					background: "linear-gradient(to right, #ff148a, #ff75ba)",
					borderRadius: "50px",
					fontWeight: "bold",
					color: "#fff",
					boxShadow: "2px 4px 8px rgba(255, 115, 185, 0.5)"
				}} onClick={share}>
					<Share sx={{
						margin: "0px 3px 0px 0px"
					}}/>

					Share
				</Button>

				<Button sx={{
					padding: "10px 20px",
					background: "linear-gradient(to right, #ff148a, #ff75ba)",
					borderRadius: "50px",
					fontWeight: "bold",
					color: "#fff",
					boxShadow: "2px 4px 8px rgba(255, 115, 185, 0.5)"
				}} onClick={download}>
					<Download sx={{
						margin: "0px 3px 0px 0px"
					}}/>

					Download
				</Button>

				<Button sx={{
					padding: "10px 20px",
					background: "linear-gradient(to right, #ff148a, #ff75ba)",
					borderRadius: "50px",
					fontWeight: "bold",
					color: "#fff",
					boxShadow: "2px 4px 8px rgba(255, 115, 185, 0.5)"
				}} onClick={() => navigate("/create")}>
					<NextPlan sx={{
						margin: "0px 3px 0px 0px"
					}}/>

					Generate Another
				</Button>
			</Box>
		</Box>
	);
}

export default View;