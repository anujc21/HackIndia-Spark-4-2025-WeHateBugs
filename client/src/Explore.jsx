import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Typography, TextField, Button} from "@mui/material";
import {Visibility, Download} from "@mui/icons-material";
import axios from "axios";

function Explore({setPage, endpoint, storeKey, user, storage, setLoading}){
	const [cardData, setCardData] = useState([]);

	const viewFile = (fileId) => {
		const fileUrl = storage.getFileView(storeKey, fileId);
	
		const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
	
		window.open(officeViewerUrl, "_blank");
	};

	const downloadFile = (fileId) => {
		const fileUrl = storage.getFileDownload(storeKey, fileId);
	
		window.open(fileUrl, "_blank");
	};

	const cards = cardData.map((data, index) => {
		return (
			<Box key={index} sx={{
				width: "220px",
				height: "220px",
				background: "#fff",
				borderRadius: "30px",
				boxShadow: "2px 4px 8px rgba(255, 255, 255, 0.8)",
				padding: "20px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				transition: "0.2s transform"
			}}>
				<Typography variant="h6" align="center" sx={{
					color: "#000"
				}}>
					{data.title}.pptx
				</Typography>

				<Typography variant="body1" align="center" sx={{
					fontWeight: "bold",
					color: "#ff148a"
				}}>
					{data.username}
				</Typography>

				<Button sx={{
					margin: "10px 0px 0px 0px",
					padding: "10px 20px",
					background: "linear-gradient(to right, #ff148a, #ff75ba)",
					borderRadius: "50px",
					fontWeight: "bold",
					color: "#fff",
					boxShadow: "2px 4px 8px rgba(255, 115, 185, 0.5)"
				}} onClick={() => viewFile(data.fileId)}>
					<Visibility sx={{
						margin: "-3px 3px 0px 0px",
						fontSize: "1.2rem"
					}}/>

					View
				</Button>

				<Button sx={{
					margin: "5px 0px 0px 0px",
					padding: "10px 20px",
					background: "linear-gradient(to right, #ff148a, #ff75ba)",
					borderRadius: "50px",
					fontWeight: "bold",
					color: "#fff",
					boxShadow: "2px 4px 8px rgba(255, 115, 185, 0.5)"
				}} onClick={() => downloadFile(data.fileId)}>
					<Download sx={{
						margin: "0px 3px 0px 0px",
						fontSize: "1.4rem"
					}}/>

					Download
				</Button>
			</Box>
		);
	});

	useEffect(() => {
		if (user.uid){
			axios.get(`${endpoint}/listAllPresentations`, {
				headers: {
					"x-user-data": JSON.stringify({
						uid: user.uid
					})
				}
			}).then((res) => {
				const data = res.data.value;

				setCardData(data);

				setLoading(false);
			});
		}
	}, [user]);

	useEffect(() => {
		setPage("explore");

		setLoading(true);
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
				margin: "150px 0px 50px 0px",
				color: "#fff"
			}}>
				Explore Presentations
			</Typography>

			<Box sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "row",
				flexWrap: "wrap",
				margin: "0px 0px 50px 0px",
				gap: "20px"
			}}>
				{cards}
			</Box>
		</Box>
	);
}

export default Explore;