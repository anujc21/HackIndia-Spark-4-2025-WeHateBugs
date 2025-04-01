import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails} from "@mui/material";
import {ArrowDropDown, Dashboard} from "@mui/icons-material";
import Carousel from "react-material-ui-carousel";

const features = [
	{
		title: "What is Nexlide",
		text: "→ NEXLIDE is a modern platform for creating and sharing interactive presentations. It supports real-time collaboration, advanced animations, and a premium plan for customization",
		image: "Screenshot_1.png"
	},
	{
		title: "How does NEXLIDE differ from other tools?",
		text: "→ NEXLIDE offers team collaboration, animations, and premium features like custom watermark removal and increased slide limits, which are not available in other tools.",
		image: "Screenshot_2.png"
	},
	{
		title: "Is NEXLIDE free to use?",
		text: "→ Yes! NEXLIDE has a free version with essential features. Users can upgrade to premium for additional benefits like custom watermarks and more slides.",
		image: "Screenshot_3.png"
	}
];

const faq = [
	{
		question: "Can multiple people work on a project simultaneously?",
		answer: "→ Yes! NEXLIDE allows real-time collaboration, so multiple users can edit, comment, and refine slides together."
	},
	{
		question: "How do I invite others to collaborate?",
		answer: "→ You can share a project link or send invitations via the collaboration feature."
	},
	{
		question: "What kind of animations are available in NEXLIDE?",
		answer: "→ NEXLIDE offers smooth transitions, text effects, and object animations to enhance presentations."
	}
];

function Home({setPage}){
	const navigate = useNavigate();

	useEffect(() => {
		setPage("home");
	}, []);

	return (
		<>
			<Box className="page" sx={{
				width: "100%",
				height: "auto",
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
				overflowY: "auto"
			}}>
				<Box sx={{
					margin: "90px 0px 10px 0px",
					width: "20rem",
					height: "20rem",
					backgroundImage: "url(./NexlideLogo.png)",
					backgroundSize: "cover",
					backgroundPostion: "center center",
					backgroundRepeat: "no-repeat"
				}}></Box>

				<Typography variant="h3" align="center" sx={{
					margin: "0px 20px 0px 20px",
					color: "#fff"
				}}>
					Nexlide: Create stunning presentations using AI
				</Typography>

				<Typography variant="h5" align="center" sx={{
					margin: "20px 20px 0px 20px",
					color: "#ccc"
				}}>
					Create stunning presentations using AI
				</Typography>

				<Button sx={{
					margin: "30px 0px 0px 0px",
					padding: "0px 30px",
					background: "linear-gradient(to right, #ff148a, #ff75ba)",
					borderRadius: "50px",
					height: "80px",
					fontWeight: "bold",
					color: "#fff",
					boxShadow: "2px 4px 8px rgba(255, 115, 185, 0.8)"
				}} onClick={() => navigate("/dashboard")}>
					<Dashboard sx={{
						margin: "-2px 4px 0px 0px"
					}}/>

					Go to Dashboard
				</Button>

				<Carousel autoPlay={true} stopAutoPlayOnHover={false} interval={2000} indicators={true} navButtonsAlwaysInvisible={true} animation="slide" sx={{
					margin: "70px 0px 50px 0px",
					width: {
						xs: "90%",
						sm: "70%",
						md: "60%",
						lg: "50%"
					}
				}}>
					{
						features.map((value, index) => {
							return (
								<Box key={index} sx={{
									width: "100%",
									height: "500px",
									color: "#fff",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									flexDirection: "column"
								}}>
									<Typography variant="h3" align="center">
										{value.title}
									</Typography>

									<Typography variant="h5" align="center" sx={{
										margin: "20px 0px 20px 0px"
									}}>
										{value.text}
									</Typography>

									<Box sx={{
										width: "100%",
										height: "300px",
										backgroundImage: `url(${value.image})`,
										backgroundSize: "cover",
										backgroundPostion: "center center",
										backgroundRepeat: "no-repeat",
										borderRadius: "20px"
									}}>

									</Box>
								</Box>
							);
						})
					}
				</Carousel>

				<Box sx={{
					width: "90%",
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					margin: "0px 0px 50px 0px"
				}}>
					<Typography variant="h3" align="center" sx={{
						color: "#fff"
					}}>
						Why use Nexlide?
					</Typography>

					<Typography variant="h5" align="center" sx={{
						margin: "20px 20px 0px 20px",
						color: "#ccc"
					}}>
						Nexlide is a Smart Presentation Generator that automates PowerPoint creation using AI. It generates structured content, designs slides based on selected templates, and includes AI-generated images. Users can customize layouts, fonts, and styles for a professional and visually appealing presentation.
					</Typography>
				</Box>

				<Box sx={{
					width: "90%",
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					margin: "0px 0px 50px 0px"
				}}>
					<Typography variant="h3" align="center" sx={{
						margin: "0px 0px 10px 0px",
						color: "#fff"
					}}>
						FAQ
					</Typography>

					{faq.map((value, index) => {
						return (
								<Accordion key={index} sx={{
									width: "90%",
									background: "#000",
									color: "#fff",
									border: "2px solid #fff",
									borderRadius: "30px!important",
									margin: "5px 0px",
									boxShadow: 0
								}}>
									<AccordionSummary
										expandIcon={<ArrowDropDown sx={{
											color: "#fff"
										}}/>}
										id="panel1-header"
									>
										<Typography variant="h6">
											{value.question}
										</Typography>
									</AccordionSummary>

									<AccordionDetails>
										<Typography variant="h6" sx={{
											color: "#ccc"
										}}>
											{value.answer}
										</Typography>
									</AccordionDetails>
								</Accordion>
							);
						})
					}
				</Box>

				<Box sx={{
					width: "100%",
					height: "40px",
					background: "#fff",
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				}}>
					<Typography variant="body1" sx={{
						color: "#000"
					}}>
						Copyright 2025 © WeHateBugs
					</Typography>
				</Box>
			</Box>
		</>
	);
}

export default Home;